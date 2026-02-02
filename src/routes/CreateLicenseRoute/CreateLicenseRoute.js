import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { omit } from 'lodash';

import PropTypes from 'prop-types';

import { useMutation, useQueryClient } from 'react-query';

import { CalloutContext, useOkapiKy, useStripes } from '@folio/stripes/core';
import {
  CREATE,
  getRefdataValuesByDesc,
  useClaim,
  useGetAccess
} from '@folio/stripes-erm-components';
import { parseErrorResponse } from '@k-int/stripes-kint-components';

import View from '../../components/LicenseForm';
import NoPermissions from '../../components/NoPermissions';
import urls from '../../components/utils/urls';

import { LICENSES_ENDPOINT } from '../../constants';
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

const CreateLicenseRoute = ({
  handlers = {},
  history,
  location,
}) => {
  const callout = useContext(CalloutContext);
  const stripes = useStripes();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();

  const hasPerms = stripes.hasPerm('ui-licenses.licenses.edit');

  const accessControlData = useGetAccess({
    resourceEndpoint: LICENSES_ENDPOINT,
    restrictions: [CREATE],
    queryNamespaceGenerator: (_restriction, canDo) => ['ERM', 'License', canDo]
  });

  const { canCreate, canCreateLoading } = accessControlData;
  const { claim } = useClaim({ resourceEndpoint: LICENSES_ENDPOINT });

  const refdata = useLicenseRefdata({
    desc: [
      LICENSE_STATUS,
      LICENSE_TYPE,
      LICENSE_ORG_ROLE,
      DOCUMENT_ATTACHMENT_TYPE,
      CONTACT_ROLE
    ]
  });

  const { mutateAsync: createLicense } = useMutation(
    [LICENSES_ENDPOINT, 'ui-licenses', 'CreateLicenseRoute', 'createLicense'],
    (payload) => ky.post(LICENSES_ENDPOINT, { json: omit(payload, ['claimPolicies']) }).json()
      .then(async (response) => {
        const { id: licenseId, name } = response;
        // Grab id from response and submit a claim ... CRUCIALLY await the response.
        if ('claimPolicies' in payload) {
          // Make blocking here, since we want this to happen FIRST before we try to save
          await claim({ resourceId: licenseId, payload: { claims: payload.claimPolicies } })
            .then(() => {
              callout.sendCallout({
                type: 'success',
                message: (
                  <FormattedMessage
                    id="ui-agreements.agreements.claimPolicies.update.callout"
                    values={{ name }}
                  />
                )
              });
            })
            .catch(async (claimError) => {
              const responseObj = claimError?.response;
              const parsedError = await parseErrorResponse(responseObj);
              callout.sendCallout({
                type: 'error',
                message: (
                  <FormattedMessage
                    id="ui-agreements.agreements.claimPolicies.update.error.callout"
                    values={{ name, error: parsedError?.message }}
                  />
                ),
                timeout: 0,
              });
            });
        }

        //  return license response at the end for the license callouts to use
        return response;
      })
      .catch((licenseError) => {
        // license failed to create
        callout.sendCallout({
          type: 'error',
          message: (
            <FormattedMessage
              id="ui-licenses.create.error.callout"
              values={{
                name: payload?.name ?? 'unknown',
                error: licenseError.message,
              }}
            />
          ),
          timeout: 0,
        });

        throw licenseError;
      })
  );

  const handleSubmit = (values) => {
    return createLicense(values).then((response) => {
      const { id: licenseId, name } = response;

      /* Invalidate cached queries */
      queryClient.invalidateQueries(['ERM', 'Licenses']);

      callout.sendCallout({ message: <FormattedMessage id="ui-licenses.create.callout" values={{ name }} /> });

      history.push(`${urls.licenseView(licenseId)}${location.search}`);
    });
  };


  const getInitialValues = () => {
    const activeStatus = getRefdataValuesByDesc(refdata, LICENSE_STATUS)?.find(v => v.value === 'active') || {};
    const localType = getRefdataValuesByDesc(refdata, LICENSE_TYPE)?.find(v => v.value === 'local') || {};
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
      accessControlData={{
        isAccessControlLoading: canCreateLoading, // Special prop used by LicenseForm to avoid edit/create distinctions
        isAccessDenied: !canCreate, // Special prop used by LicenseForm to avoid edit/create distinctions
        ...accessControlData,
        // Cheat these values for the sake of the form.
        canApplyPolicies: true,
        canApplyPoliciesLoading: false,
      }}
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
      onSubmit={handleSubmit}
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

export default CreateLicenseRoute;
