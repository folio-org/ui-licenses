import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { cloneDeep, get } from 'lodash';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { CalloutContext, useOkapiKy, useStripes } from '@folio/stripes/core';
import { getRefdataValuesByDesc, useUsers } from '@folio/stripes-erm-components';

import Form from '../components/LicenseForm';
import NoPermissions from '../components/NoPermissions';
import { LICENSE_ENDPOINT } from '../constants/endpoints';
import { useLicenseRefdata } from '../hooks';

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

const EditLicenseRoute = ({
  handlers = {},
  history,
  location,
  match: { params: { id: licenseId } },
}) => {
  const callout = useContext(CalloutContext);
  const stripes = useStripes();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();

  const refdata = useLicenseRefdata({
    desc: [
      LICENSE_STATUS,
      LICENSE_TYPE,
      LICENSE_ORG_ROLE,
      DOCUMENT_ATTACHMENT_TYPE,
      CONTACT_ROLE
    ]
  });

  const handleClose = () => {
    history.push(`/licenses/${licenseId}${location.search}`);
  };

  const { data: license = {}, isLoading: isLicenseLoading } = useQuery(
    [LICENSE_ENDPOINT(licenseId), 'getLicense'],
    () => ky.get(LICENSE_ENDPOINT(licenseId)).json()
  );

  const { mutateAsync: putLicense } = useMutation(
    [LICENSE_ENDPOINT(licenseId), 'putLicense'],
    (payload) => ky.put(LICENSE_ENDPOINT(licenseId), { json: payload }).json()
      .then(({ name }) => {
        /* Invalidate cached queries */
        queryClient.invalidateQueries(['ERM', 'Licenses']);
        queryClient.invalidateQueries(LICENSE_ENDPOINT(licenseId));

        callout.sendCallout({ message: <FormattedMessage id="ui-licenses.update.callout" values={{ name }} /> });
        handleClose();
      })
  );

  // Users
  const { data: { users = [] } = {} } = useUsers(license?.contacts?.filter(c => c.user)?.map(c => c.user));

  const getInitialValues = () => {
    const initialValues = cloneDeep(license);
    const {
      contacts = [],
      orgs = [],
      status = {},
      supplementaryDocs = [],
      type = {},
    } = initialValues;

    // Set the values of dropdown-controlled props as values rather than objects.
    initialValues.status = status.value;
    initialValues.type = type.value;
    initialValues.contacts = contacts.map(c => ({ ...c, role: c.role.value }));
    initialValues.orgs = orgs.map(o => ({ ...o, role: o.role ? o.role.value : undefined }));
    initialValues.supplementaryDocs = supplementaryDocs.map(o => ({ ...o, atType: get(o, 'atType.value') }));

    return initialValues;
  };

  const handleSubmit = (values) => {
    return putLicense(values);
  };

  if (!stripes.hasPerm('ui-licenses.licenses.edit')) return <NoPermissions />;

  return (
    <Form
      data={{
        contactRoleValues: getRefdataValuesByDesc(refdata, CONTACT_ROLE),
        documentCategories: getRefdataValuesByDesc(refdata, DOCUMENT_ATTACHMENT_TYPE),
        orgRoleValues: getRefdataValuesByDesc(refdata, LICENSE_ORG_ROLE),
        statusValues: getRefdataValuesByDesc(refdata, LICENSE_STATUS),
        typeValues: getRefdataValuesByDesc(refdata, LICENSE_TYPE),
        users,
      }}
      handlers={{
        ...handlers,
        onClose: handleClose,
      }}
      initialValues={getInitialValues()}
      isLoading={isLicenseLoading}
      onSubmit={handleSubmit}
    />
  );
};

export default EditLicenseRoute;

EditLicenseRoute.propTypes = {
  handlers: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
