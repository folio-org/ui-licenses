import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { get, flatten, uniqBy } from 'lodash';
import compose from 'compose-function';

import { CalloutContext, stripesConnect, useOkapiKy } from '@folio/stripes/core';
import { useBatchedFetch, useUsers } from '@folio/stripes-erm-components';
import { withTags } from '@folio/stripes/smart-components';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

import withFileHandlers from '../components/withFileHandlers';
import View from '../../components/License';
import { urls as appUrls } from '../../components/utils';
import { errorTypes } from '../../constants';
import { LICENSES_ENDPOINT, LICENSE_ENDPOINT, LINKED_AGREEMENTS_ENDPOINT } from '../../constants/endpoints';

import { useLicensesHelperApp } from '../../hooks';

const RECORDS_PER_REQUEST = 100;
const credentialsArray = [];

const ViewLicenseRoute = ({
  handlers = {},
  history,
  location,
  match: { params: { id: licenseId } },
  mutator,
  resources,
  stripes,
  tagsEnabled
}) => {
  const callout = useContext(CalloutContext);
  const ky = useOkapiKy();
  const queryClient = useQueryClient();

  const licensePath = LICENSE_ENDPOINT(licenseId);

  const {
    handleToggleTags,
    HelperComponent,
    TagButton,
  } = useLicensesHelperApp(tagsEnabled);

  // License fetch
  const {
    data: license = {
      contacts: [],
      orgs: [],
    },
    isLoading: isLicenseLoading
  } = useQuery(
    [licensePath, 'ui-licenses', 'LicenseViewRoute', 'getLicense'],
    () => ky.get(licensePath).json(),
    {
      enabled: !!licenseId
    }
  );

  // Users fetch
  const { data: { users = [] } = {} } = useUsers(license?.contacts.filter(c => c.user)?.map(c => c.user));

  // License delete
  const { mutateAsync: deleteLicense } = useMutation(
    [licensePath, 'ui-licenses', 'LicenseViewRoute', 'deleteLicense'],
    () => ky.delete(licensePath).then(() => queryClient.invalidateQueries(LICENSES_ENDPOINT))
  );

  // LinkedAgreements BATCH FETCH
  const {
    results: linkedAgreements,
  } = useBatchedFetch({
    batchSize: RECORDS_PER_REQUEST,
    path: LINKED_AGREEMENTS_ENDPOINT(licenseId),
  });

  const getRecord = (id, resourceType) => {
    return get(resources, `${resourceType}.records`, [])
      .find(i => i.id === id);
  };

  const getCompositeLicense = () => {
    const contacts = license.contacts?.map(c => ({
      ...c,
      user: users?.find(user => user?.id === c.user) || c.user,
    }));

    const interfacesCredentials = uniqBy(get(resources, 'interfacesCredentials.records', []), 'id');

    if (interfacesCredentials[0]) {
      const index = credentialsArray.findIndex(object => object.id === interfacesCredentials[0].id);
      if (index === -1) {
        credentialsArray.push(interfacesCredentials[0]);
      }
    }

    const orgs = license.orgs?.map(o => ({
      ...o,
      interfaces: get(o, 'org.orgsUuid_object.interfaces', [])
        .map(id => ({
          ...getRecord(id, 'interfaces') || {},
          credentials: credentialsArray.find(cred => cred.interfaceId === id)
        })),
    }));

    return {
      ...license,
      contacts,
      linkedAgreements,
      orgs,
    };
  };

  const { mutateAsync: cloneLicense } = useMutation(
    [licensePath, 'ui-licenses', 'ViewLicenseRoute', 'cloneLicense'],
    (cloneableProperties) => ky.post(`${licensePath}/clone`, { json: cloneableProperties }).then(response => {
      if (response.ok) {
        return response.text(); // Parse it as text
      } else {
        throw new Error(errorTypes.JSON_ERROR);
      }
    }).then(text => {
      const data = JSON.parse(text); // Try to parse it as json
      if (data.id) {
        return Promise.resolve(history.push(`${appUrls.licensesEdit(data.id)}${location.search}`));
      } else {
        throw new Error(errorTypes.INVALID_JSON_ERROR); // when the json response body doesn't contain an id
      }
    }).catch(error => {
      throw error;
    })
  );

  const handleClose = () => {
    history.push(`/licenses${location.search}`);
  };

  const handleDelete = () => {
    const compositeLicense = getCompositeLicense();
    if (compositeLicense.linkedAgreements?.length) {
      callout.sendCallout({ type: 'error', timeout: 0, message: <SafeHTMLMessage id="ui-licenses.errors.noDeleteHasLinkedAgreements" /> });
      return;
    }

    deleteLicense().then(() => {
      history.push(`${appUrls.licenses()}${location.search}`);
      callout.sendCallout({ message: <SafeHTMLMessage id="ui-licenses.deletedLicense" values={{ name: compositeLicense.name }} /> });
    }).catch(error => {
      callout.sendCallout({ type: 'error', timeout: 0, message: <SafeHTMLMessage id="ui-licenses.errors.noDeleteLicenseBackendError" values={{ message: error.message }} /> });
    });
  };

  const handleFetchCredentials = (id) => {
    mutator.interfaceRecord.replace({ id });
  };

  const urls = {
    edit: stripes.hasPerm('ui-licenses.licenses.edit') && (() => `${location.pathname}/edit${location.search}`),
    addAmendment: stripes.hasPerm('ui-licenses.licenses.edit') && (() => `${location.pathname}/amendments/create${location.search}`),
    viewAmendment: amendmentId => `${location.pathname}/amendments/${amendmentId}${location.search}`,
  };

  const viewAmendment = (id) => {
    history.push(urls.viewAmendment(id));
  };

  const editLicense = (id) => {
    history.push(urls.edit(id));
  };

  return (
    <View
      components={{
        HelperComponent,
        TagButton
      }}
      data={{
        license: getCompositeLicense(),
        tagsLink: licensePath
      }}
      handlers={{
        ...handlers,
        onClone: cloneLicense,
        onClose: handleClose,
        onDelete: handleDelete,
        onEdit: editLicense,
        onFetchCredentials: handleFetchCredentials,
        onAmendmentClick: viewAmendment,
        onToggleTags: handleToggleTags,
      }}
      isLoading={isLicenseLoading}
      urls={urls}
    />
  );
};

ViewLicenseRoute.propTypes = {
  handlers: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  mutator: PropTypes.shape({
    interfaceRecord: PropTypes.shape({
      replace: PropTypes.func,
    }),
  }).isRequired,
  resources: PropTypes.shape({
    interfaces: PropTypes.object,
    license: PropTypes.object,
    query: PropTypes.shape({
      helper: PropTypes.string,
    }),
  }).isRequired,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
    okapi: PropTypes.object.isRequired,
  }).isRequired,
  tagsEnabled: PropTypes.bool,
};

ViewLicenseRoute.manifest = Object.freeze({
  interfaces: {
    type: 'okapi',
    path: 'organizations-storage/interfaces',
    perRequest: RECORDS_PER_REQUEST,
    params: (_q, _p, _r, _l, props) => {
      const orgs = get(props.resources, 'license.records[0].orgs', []);
      const interfaces = flatten(orgs.map(o => get(o, 'org.orgsUuid_object.interfaces', [])));
      const query = [
        ...new Set(interfaces.map(i => `id==${i}`))
      ].join(' or ');

      return query ? { query } : {};
    },
    fetch: props => !!props.stripes.hasInterface('organizations-storage.interfaces', '2.0'),
    permissionsRequired: 'organizations-storage.interfaces.collection.get',
    records: 'interfaces',
  },
  interfacesCredentials: {
    clientGeneratePk: false,
    throwErrors: false,
    path: 'organizations-storage/interfaces/%{interfaceRecord.id}/credentials',
    type: 'okapi',
    pk: 'FAKE_PK',  // it's done to fool stripes-connect not to add cred id to the path's end.
    permissionsRequired: 'organizations-storage.interfaces.credentials.item.get',
    fetch: props => !!props.stripes.hasInterface('organizations-storage.interfaces', '1.0 2.0'),
  },
  interfaceRecord: {},
});

export default compose(
  withFileHandlers,
  stripesConnect,
  withTags,
)(ViewLicenseRoute);
