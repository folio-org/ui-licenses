import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { cloneDeep, get } from 'lodash';

import { CalloutContext, useOkapiKy } from '@folio/stripes/core';
import { getRefdataValuesByDesc } from '@folio/stripes-erm-components';

import Form from '../components/AmendmentForm';
import { LICENSES_ENDPOINT, LICENSE_ENDPOINT } from '../constants/endpoints';
import useLicenseRefdata from '../hooks/useLicenseRefdata';

const [
  LICENSE_STATUS,
  DOCUMENT_ATTACHMENT_TYPE,
] = [
  'License.Status',
  'DocumentAttachment.AtType',
];

const EditAmendmentRoute = ({
  handlers = {},
  history,
  location,
  match: { params: { id: licenseId, amendmentId } },
}) => {
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);
  const queryClient = useQueryClient();
  const [selectedAmendment, setSelectedAmendment] = useState({});

  const refdata = useLicenseRefdata({
    desc: [
      LICENSE_STATUS,
      DOCUMENT_ATTACHMENT_TYPE,
    ]
  });

  const handleClose = () => {
    history.push(`/licenses/${licenseId}/amendments/${amendmentId}${location.search}`);
  };

  const { data: license = {}, isLoading: isLicenseLoading } = useQuery(
    [LICENSE_ENDPOINT(licenseId), 'getLicense'],
    () => ky.get(LICENSE_ENDPOINT(licenseId)).json()
  );

  const { mutateAsync: editAmendment } = useMutation(
    [LICENSE_ENDPOINT(licenseId), 'editAmendment'],
    (amendmentPayload) => ky.put(LICENSE_ENDPOINT(licenseId), { json: {
      ...license,
      amendments: [amendmentPayload]
    } }).json()
      .then(() => {
        /* Invalidate cached queries */
        queryClient.invalidateQueries(LICENSES_ENDPOINT);
        queryClient.invalidateQueries(LICENSE_ENDPOINT(licenseId));
      })
  );

  useEffect(() => {
    if (amendmentId !== selectedAmendment?.id) {
      const amendments = license?.amendments ?? [];
      setSelectedAmendment(amendments.find(a => a.id === amendmentId));
    }
  }, [amendmentId, license?.amendments, selectedAmendment]);

  const getInitialValues = () => {
    const initialValues = cloneDeep(selectedAmendment);
    const {
      status = {},
      supplementaryDocs = [],
    } = initialValues;

    // Set the values of dropdown-controlled props as values rather than objects.
    initialValues.status = status.value;
    initialValues.supplementaryDocs = supplementaryDocs.map(o => ({ ...o, atType: get(o, 'atType.value') }));

    // Add the default terms to the already-set terms.
    initialValues.customProperties = initialValues.customProperties || {};

    return initialValues;
  };

  const handleSubmit = (values) => {
    const name = values?.name;

    return editAmendment(values)
      .then(() => {
        callout.sendCallout({ message: <FormattedMessage id="ui-licenses.amendments.update.callout" values={{ name }} /> });
        handleClose();
      });
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

EditAmendmentRoute.propTypes = {
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
      amendmentId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EditAmendmentRoute;
