import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { flatten } from 'lodash';

import { useCallout, useOkapiKy, useStripes } from '@folio/stripes/core';
import {
  INVALID_JSON_ERROR,
  JSON_ERROR,
  useChunkedUsers,
  useInterfaces,
  useParallelBatchFetch
} from '@folio/stripes-erm-components';

import View from '../../components/License';
import { urls as appUrls } from '../../components/utils';

import { LICENSE_ENDPOINT, LINKED_AGREEMENTS_ENDPOINT } from '../../constants';
import { useLicensesHelperApp } from '../../hooks';

const ViewLicenseRoute = ({
  handlers = {},
  history,
  location,
  match: { params: { id: licenseId } },
}) => {
  const callout = useCallout();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const stripes = useStripes();

  const licensePath = LICENSE_ENDPOINT(licenseId);

  const {
    handleToggleTags,
    HelperComponent,
    TagButton,
  } = useLicensesHelperApp();

  // License fetch
  const {
    data: license = {
      contacts: [],
      orgs: [],
    },
    isLoading: isLicenseLoading
  } = useQuery(
    // NOTE Used as invalidate link for tags below!
    [licensePath, 'getLicense'],
    () => ky.get(licensePath).json(),
    {
      enabled: !!licenseId
    }
  );

  const interfaces = useInterfaces({
    interfaceIds: flatten((license?.orgs ?? []).map(o => o?.org?.orgsUuid_object?.interfaces ?? []))
  }) ?? [];

  // Users fetch
  const { users } = useChunkedUsers(license?.contacts?.filter(c => c.user)?.map(c => c.user) ?? []);

  // License delete
  const { mutateAsync: deleteLicense } = useMutation(
    [licensePath, 'ui-licenses', 'LicenseViewRoute', 'deleteLicense'],
    () => ky.delete(licensePath).then(() => queryClient.invalidateQueries(['ERM', 'Licenses']))
  );

  // LinkedAgreements BATCH FETCH
  const {
    items: linkedAgreements = [],
  } = useParallelBatchFetch({
    generateQueryKey: ({ offset }) => ['ERM', 'License', licenseId, 'LinkedAgreements', offset],
    endpoint: LINKED_AGREEMENTS_ENDPOINT(licenseId),
  });


  const getCompositeLicense = () => {
    const contacts = license.contacts?.map(c => ({
      ...c,
      user: users?.find(user => user?.id === c.user) || c.user,
    }));

    const orgs = license.orgs?.map(o => ({
      ...o,
      interfaces: (o?.org?.orgsUuid_object?.interfaces ?? [])
        .map(id => ({
          ...(interfaces?.find(int => int?.id === id) ?? {}),
          /* Credentials are now handled by ViewOrganizationCard directly */
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
        throw new Error(JSON_ERROR);
      }
    }).then(text => {
      const data = JSON.parse(text); // Try to parse it as json
      if (data.id) {
        return Promise.resolve(history.push(`${appUrls.licenseEdit(data.id)}${location.search}`));
      } else {
        throw new Error(INVALID_JSON_ERROR); // when the json response body doesn't contain an id
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
      callout.sendCallout({ type: 'error', timeout: 0, message: <FormattedMessage id="ui-licenses.errors.noDeleteHasLinkedAgreements" /> });
      return;
    }

    deleteLicense().then(() => {
      history.push(`${appUrls.licenses()}${location.search}`);
      callout.sendCallout({ message: <FormattedMessage id="ui-licenses.deletedLicense" values={{ name: compositeLicense.name }} /> });
    }).catch(error => {
      callout.sendCallout({ type: 'error', timeout: 0, message: <FormattedMessage id="ui-licenses.errors.noDeleteLicenseBackendError" values={{ message: error.message }} /> });
    });
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
};

export default ViewLicenseRoute;
