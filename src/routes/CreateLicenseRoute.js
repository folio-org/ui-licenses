import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';

import { useMutation } from 'react-query';

import { refdataOptions, useRefdata } from '@k-int/stripes-kint-components';
import { CalloutContext, useOkapiKy, useStripes } from '@folio/stripes/core';

import withFileHandlers from './components/withFileHandlers';
import View from '../components/LicenseForm';
import NoPermissions from '../components/NoPermissions';
import { LICENSES_ENDPOINT, REFDATA_ENDPOINT } from '../constants/endpoints';

import { getRefdataValuesByDesc } from '../components/utils';

const [
  LICENSE_STATUS,
  LICENSE_TYPE,
  LICENSE_ORG_ROLE,
  DOCUMENT_ATTACHMENT_TYPE,
  CONTACT_ROLE
] = [
  'License.Status',
  'License.Type',
  'LicenseOrg.Role',
  'DocumentAttachment.AtType',
  'InternalContact.Role'
];

const CreateLicenseRoute = ({
  handlers = {},
  history,
  location,
}) => {
  const callout = useContext(CalloutContext);
  const stripes = useStripes();
  const ky = useOkapiKy();

  const hasPerms = stripes.hasPerm('ui-licenses.licenses.edit');

  const refdata = useRefdata({
    desc: [
      LICENSE_STATUS,
      LICENSE_TYPE,
      LICENSE_ORG_ROLE,
      DOCUMENT_ATTACHMENT_TYPE,
      CONTACT_ROLE
    ],
    endpoint: REFDATA_ENDPOINT,
    options: { ...refdataOptions, sort: [{ path: 'desc' }] }
  });

  const { mutateAsync: createLicense } = useMutation(
    [LICENSES_ENDPOINT, 'ui-licenses', 'CreateLicenseRoute', 'createLicense'],
    (payload) => ky.post(LICENSES_ENDPOINT, { json: payload }).json()
      .then(({ id, name }) => {
        callout.sendCallout({ message: <FormattedMessage id="ui-licenses.create.callout" values={{ name }} /> });
        history.push(`/licenses/${id}${location.search}`);
      })
  );

  const getInitialValues = () => {
    const activeStatus = getRefdataValuesByDesc(refdata, LICENSE_STATUS)?.find(v => v.value === 'active') || {}
    const localType = getRefdataValuesByDesc(refdata, LICENSE_TYPE)?.find(v => v.value === 'local') || {}
    const customProperties = {};

    return {
      status: activeStatus.value,
      type: localType.value,
      customProperties,
      openEnded: false
    };
  };

  const handleClose = () => {
    history.push(`/licenses${location.search}`);
  };

  if (!hasPerms) return <NoPermissions />;

  return (
    <View
      data={{
        contactRoleValues: getRefdataValuesByDesc(refdata, CONTACT_ROLE),
        documentCategories: getRefdataValuesByDesc(refdata, DOCUMENT_ATTACHMENT_TYPE),
        orgRoleValues: getRefdataValuesByDesc(refdata, LICENSE_ORG_ROLE),
        statusValues: getRefdataValuesByDesc(refdata, LICENSE_STATUS),
        typeValues: getRefdataValuesByDesc(refdata, LICENSE_TYPE),
        users: []
      }}
      handlers={{
        ...handlers,
        onClose: handleClose,
      }}
      initialValues={getInitialValues()}
      isLoading={false} // I don't think this will ever need to be "loading"
      onSubmit={createLicense}
    />
  );
};

CreateLicenseRoute.propTypes = {
  handlers: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withFileHandlers(CreateLicenseRoute);
