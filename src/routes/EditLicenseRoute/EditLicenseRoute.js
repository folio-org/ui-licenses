import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { cloneDeep, get, omit } from 'lodash';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { parseErrorResponse } from '@k-int/stripes-kint-components';

import { CalloutContext, useOkapiKy, useStripes } from '@folio/stripes/core';
import { LoadingView } from '@folio/stripes/components';
import {
  APPLY_POLICIES,
  getRefdataValuesByDesc,
  READ,
  UPDATE,
  useChunkedUsers,
  useGetAccess,
  useClaim,
  usePolicies,
  isEqualClaimPolicies,
} from '@folio/stripes-erm-components';

import Form from '../../components/LicenseForm';
import NoPermissions from '../../components/NoPermissions';

import { LICENSE_ENDPOINT, LICENSES_ENDPOINT } from '../../constants';
import { useLicenseRefdata } from '../../hooks';

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

  const accessControlData = useGetAccess({
    resourceEndpoint: LICENSES_ENDPOINT,
    resourceId: licenseId,
    restrictions: [READ, UPDATE, APPLY_POLICIES],
    queryNamespaceGenerator: (_restriction, canDo) => ['ERM', 'License', licenseId, canDo]
  });

  const {
    canRead,
    canReadLoading,
    canEdit,
    canEditLoading,
  } = accessControlData;
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
    () => ky.get(LICENSE_ENDPOINT(licenseId)).json(),
    {
      enabled: !canReadLoading && !!canRead
    }
  );

  const { claim } = useClaim({ resourceEndpoint: LICENSES_ENDPOINT });

  const { policies } = usePolicies({
    resourceEndpoint: LICENSES_ENDPOINT,
    resourceId: licenseId,
    queryNamespaceGenerator: () => ['ERM', 'License', licenseId, 'policies'],
  });

  const { mutateAsync: putLicense } = useMutation(
    [LICENSE_ENDPOINT(licenseId), 'putLicense'],
    (payload) => ky.put(LICENSE_ENDPOINT(licenseId), { json: omit(payload, ['claimPolicies']) }).json()
      .then(async (response) => {
        const { name } = response;
        // Handle claim policies if they have changed
        if (!isEqualClaimPolicies(policies ?? [], payload?.claimPolicies ?? [])) {
          await claim({ resourceId: licenseId, payload: { claims: payload.claimPolicies ?? [] } })
            .then(() => {
              callout.sendCallout({
                type: 'success',
                message: <FormattedMessage id="ui-agreements.agreements.claimPolicies.update.callout" values={{ name }} />,
              });
            })
            .catch(async (claimError) => {
              const responseObj = claimError?.response;
              const parsedError = await parseErrorResponse(responseObj);
              callout.sendCallout({
                type: 'error',
                message: <FormattedMessage
                  id="ui-agreements.agreements.claimPolicies.update.error.callout"
                  values={{ name, error: parsedError?.message }}
                />,
                timeout: 0,
              });
            });
        }
        return response;
      })
      .then(async (response) => {
        const { name } = response;
        /* Invalidate cached queries */
        await queryClient.invalidateQueries(['ERM', 'Licenses']);
        await queryClient.invalidateQueries(LICENSE_ENDPOINT(licenseId));

        callout.sendCallout({ message: <FormattedMessage id="ui-licenses.update.callout" values={{ name }} /> });
        handleClose();
        return response;
      })
      .catch((licenseError) => {
        callout.sendCallout({
          type: 'error',
          message: <FormattedMessage id="ui-licenses.update.error.callout" values={{ name: payload?.name ?? '', error: licenseError.message }} />,
          timeout: 0,
        });
        throw licenseError;
      })
  );

  // Users
  const { users } = useChunkedUsers(license?.contacts?.filter(c => c.user)?.map(c => c.user) ?? []);

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
    initialValues.claimPolicies = policies;

    return initialValues;
  };

  const handleSubmit = (values) => {
    return putLicense(values);
  };

  const fetchIsPending = () => {
    return isLicenseLoading;
  };

  if (!stripes.hasPerm('ui-licenses.licenses.edit')) return <NoPermissions />;
  if (fetchIsPending()) return <LoadingView dismissible onClose={handleClose} />;

  return (
    <Form
      accessControlData={{
        isAccessControlLoading: canEditLoading || canReadLoading, // Special prop used by LicenseForm to avoid edit/create distinctions
        isAccessDenied: !canRead || !canEdit, // Special prop used by LicenseForm to avoid edit/create distinctions
        ...accessControlData
      }}
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
