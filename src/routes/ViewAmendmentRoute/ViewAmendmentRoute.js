import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FormattedMessage } from 'react-intl';

import SafeHTMLMessage from '@folio/react-intl-safe-html';

import { CalloutContext, useOkapiKy, useStripes } from '@folio/stripes/core';
import { ConfirmationModal } from '@folio/stripes/components';
import { useBatchedFetch } from '@folio/stripes-erm-components';

import DuplicateAmendmentModal from '../../components/DuplicateAmendmentModal';
import withFileHandlers from '../components/withFileHandlers';
import View from '../../components/Amendment';

import { errorTypes } from '../../constants';
import { AMENDMENT_ENDPOINT, LICENSE_ENDPOINT, LINKED_AGREEMENTS_ENDPOINT } from '../../constants/endpoints';

const RECORDS_PER_REQUEST = 100;
const propTypes = {
  handlers: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      amendmentId: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
    okapi: PropTypes.object.isRequired,
  }).isRequired,
};

const ViewAmendmentRoute = ({
  handlers = {},
  history,
  location,
  match: { params: { id: licenseId, amendmentId }}
}) => {
  const stripes = useStripes();
  const callout = useContext(CalloutContext);
  const ky = useOkapiKy();
  const queryClient = useQueryClient();

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDuplicate, setShowDuplicate] = useState(false);

  const amendmentPath = AMENDMENT_ENDPOINT(amendmentId);

  const { data: amendment = {} } = useQuery(
    [amendmentPath, 'ui-licenses', 'ViewAmendmentRoute', 'getAmendment'],
    () => ky.get(amendmentPath).json()
  );

  const licensePath = LICENSE_ENDPOINT(licenseId);
  // License fetch
  const {
    data: license = {},
    isLoading: isLicenseLoading
  } = useQuery(
    [licensePath, 'ui-licenses', 'ViewAmendmentRoute', 'getLicense'],
    () => ky.get(licensePath).json(),
    {
      enabled: !!licenseId
    }
  );

  // LinkedAgreements BATCH FETCH
  const {
    results: linkedAgreements = [],
  } = useBatchedFetch({
    batchSize: RECORDS_PER_REQUEST,
    path: LINKED_AGREEMENTS_ENDPOINT(licenseId),
  });

  const getCompositeLicense = () => {
    return {
      ...license,
      linkedAgreements,
    };
  };

  const handleClose = () => {
    history.push(`/licenses/${licenseId}${location.search}`);
  };

  // AMENDMENT delete
  const { mutateAsync: deleteAmendment } = useMutation(
    [licensePath, 'ui-licenses', 'ViewAmendmentRoute', 'deleteAmendment'],
    () => ky.put(licensePath, {
      json: {
        ...license,
        amendments: [{
          id: amendmentId,
          _delete: true,
        }],
      }
    }).then(() => {
      queryClient.invalidateQueries(licensePath);

      callout.sendCallout({ message: <SafeHTMLMessage id="ui-licenses.amendments.delete.callout" values={{ name }} /> });
      handleClose();
    })
  );

  const urls = {
    editAmendment: stripes.hasPerm('ui-licenses.licenses.edit') && (aID => `/licenses/${licenseId}/amendments/${aID}/edit${location.search}`),
    licenseView: id => `/licenses/${id}`,
    viewAmendment: aID => `/licenses/${licenseId}/amendments/${aID}${location.search}`,
  };

  // AMENDMENT clone
  const { mutateAsync: cloneAmendment } = useMutation(
    [`${amendmentPath}/clone`, 'ui-licenses', 'ViewAmendmentRoute', 'cloneAmendment'],
    (cloneableProperties) => ky.post(`${amendmentPath}/clone`, { json: cloneableProperties }).then(response => {
      if (response.ok) {
        return response.text(); // Parse it as text
      } else {
        throw new Error(errorTypes.JSON_ERROR);
      }
    }).then(text => {
      const data = JSON.parse(text); // Try to parse it as json
      if (data.id) {
        return Promise.resolve(history.push(`${urls.editAmendment(data.id)}`)); // Location search is already a part of urls.editAmendment
      } else {
        throw new Error(errorTypes.INVALID_JSON_ERROR); // when the json response body doesn't contain an id
      }
    }).catch(error => {
      throw error;
    })
  );

  const showDeleteConfirmationModal = () => setShowConfirmDelete(true);
  const hideDeleteConfirmationModal = () => setShowConfirmDelete(false);

  const showDuplicateModal = () => setShowDuplicate(true);
  const closeDuplicateModal = () => setShowDuplicate(false);

  const handleEditAmendment = (id) => {
    history.push(urls.editAmendment(id));
  };

  const handleViewAmendment = (id) => {
    history.push(urls.viewAmendment(id));
  };

  return (
    <>
      <View
        data={{
          amendment,
          license: getCompositeLicense(),
        }}
        handlers={{
          ...handlers,
          onClose: handleClose,
          onDelete: stripes.hasPerm('ui-licenses.licenses.edit') && deleteAmendment && showDeleteConfirmationModal,
          onClone: stripes.hasPerm('ui-licenses.licenses.edit') && cloneAmendment && showDuplicateModal,
          onEditAmendment: handleEditAmendment,
          onAmendmentClick: handleViewAmendment
        }}
        isLoading={isLicenseLoading}
        urls={urls}
      />
      {showDuplicate &&
        <DuplicateAmendmentModal
          onClone={cloneAmendment}
          onClose={closeDuplicateModal}
        />
      }
      {showConfirmDelete && (
        <ConfirmationModal
          buttonStyle="danger"
          confirmLabel={<FormattedMessage id="ui-licenses.amendments.delete.confirmLabel" />}
          heading={<FormattedMessage id="ui-licenses.amendments.delete.confirmHeading" />}
          id="delete-job-confirmation"
          message={<SafeHTMLMessage id="ui-licenses.amendments.delete.confirmMessage" values={{ name: amendment.name }} />}
          onCancel={hideDeleteConfirmationModal}
          onConfirm={deleteAmendment}
          open
        />
      )}
    </>
  );
};

ViewAmendmentRoute.propTypes = propTypes;

export default withFileHandlers(ViewAmendmentRoute);
