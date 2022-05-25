import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { CalloutContext, useOkapiKy } from '@folio/stripes/core';

import Form from '../../components/AmendmentForm';
import { getRefdataValuesByDesc } from '../../components/utils';
import { LICENSES_ENDPOINT, LICENSE_ENDPOINT } from '../../constants/endpoints';
import { useLicenseRefdata } from '../../hooks';

const [
  LICENSE_STATUS,
  DOCUMENT_ATTACHMENT_TYPE,
] = [
  'License.Status',
  'DocumentAttachment.AtType',
];

const CreateAmendmentRoute = ({
  handlers = {},
  history,
  location,
  match: { params: { id: licenseId } },
}) => {
  const callout = useContext(CalloutContext);
  const ky = useOkapiKy();
  const queryClient = useQueryClient();

  const refdata = useLicenseRefdata({
    desc: [
      LICENSE_STATUS,
      DOCUMENT_ATTACHMENT_TYPE,
    ]
  });

  const getInitialValues = () => {
    const status = getRefdataValuesByDesc(refdata, LICENSE_STATUS)?.find(v => v.value === 'active') ?? {};

    return {
      status: status.value,
      openEnded: false
    };
  };

  const { data: license = {}, isLoading: isLicenseLoading } = useQuery(
    [LICENSE_ENDPOINT(licenseId), 'getLicense'],
    () => ky.get(LICENSE_ENDPOINT(licenseId)).json()
  );

  const handleClose = () => {
    history.push(`/licenses/${licenseId}${location.search}`);
  };

  const { mutateAsync: createAmendment } = useMutation(
    [LICENSE_ENDPOINT(licenseId), 'createAmendment'],
    (amendmentPayload) => ky.put(LICENSE_ENDPOINT(licenseId), { json: {
      ...license,
      amendments: [amendmentPayload]
    } }).json()
      .then(updatedLicense => {
        /* Invalidate cached queries */
        queryClient.invalidateQueries(LICENSES_ENDPOINT);
        queryClient.invalidateQueries(LICENSE_ENDPOINT(licenseId));

        const originalAmendmentIds = {};
        (license.amendments || []).forEach(a => { originalAmendmentIds[a.id] = 1; });

        // We have to figure out which the new amendment is from the list...
        let newAmendmentId;
        (updatedLicense.amendments || []).forEach(a => {
          if (originalAmendmentIds[a.id] === undefined) {
            newAmendmentId = a.id;
          }
        });
        callout.sendCallout({ message: <FormattedMessage id="ui-licenses.amendments.create.callout" values={{ name: amendmentPayload?.name }} /> });
        history.push(`/licenses/${licenseId}/amendments/${newAmendmentId}${location.search}`);
      })
  );

  const handleSubmit = (values) => {
    return createAmendment(values);
  };

  return (
    <Form
      data={{
        license,
        documentCategories: getRefdataValuesByDesc(refdata, DOCUMENT_ATTACHMENT_TYPE),
        statusValues: getRefdataValuesByDesc(refdata, LICENSE_STATUS),
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

CreateAmendmentRoute.propTypes = {
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

export default CreateAmendmentRoute;
