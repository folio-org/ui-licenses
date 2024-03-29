import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { CalloutContext, useOkapiKy, useStripes } from '@folio/stripes/core';
import { ConfirmationModal } from '@folio/stripes/components';
import {
  INVALID_JSON_ERROR,
  JSON_ERROR,
  useParallelBatchFetch
} from '@folio/stripes-erm-components';

import DuplicateAmendmentModal from '../../components/DuplicateAmendmentModal';
import View from '../../components/Amendment';

import {
  AMENDMENT_ENDPOINT,
  LICENSE_ENDPOINT,
  LINKED_AGREEMENTS_ENDPOINT
} from '../../constants';
import { urls as appUrls } from '../../components/utils';

const propTypes = {
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
      amendmentId: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const ViewAmendmentRoute = ({
  handlers = {},
  history,
  location,
  match: { params: { id: licenseId, amendmentId } }
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
    [licensePath, 'getLicense'],
    () => ky.get(licensePath).json(),
    {
      enabled: !!licenseId
    }
  );

  // LinkedAgreements BATCH FETCH
  const {
    items: linkedAgreements = [],
  } = useParallelBatchFetch({
    generateQueryKey: ({ offset }) => ['ERM', 'License', licenseId, 'LinkedAgreements', offset],
    endpoint: LINKED_AGREEMENTS_ENDPOINT(licenseId),
  });

  const getCompositeLicense = () => {
    return {
      ...license,
      linkedAgreements,
    };
  };

  const handleClose = () => {
    // If we're coming from amendments, go back to amendments, else go back to license view
    if (location.pathname.startsWith('/licenses/amendments')) {
      history.push(`${appUrls.amendments()}${location.search}`);
    } else {
      history.push(`${appUrls.licenseView(licenseId)}${location.search}`);
    }
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
      queryClient.invalidateQueries(['ERM', 'Amendments']);

      callout.sendCallout({ message: <FormattedMessage id="ui-licenses.amendments.delete.callout" values={{ name: amendment.name }} /> });
      handleClose();
    })
  );

  const urls = {
    editAmendment: stripes.hasPerm('ui-licenses.licenses.edit') && (
      aID => (location.pathname.startsWith('/licenses/amendments') ?
        appUrls.amendmentNativeEdit(licenseId, aID)
        :
        appUrls.amendmentEdit(licenseId, aID)
      )
    ),
  };

  // AMENDMENT clone
  const { mutateAsync: cloneAmendment } = useMutation(
    [`${amendmentPath}/clone`, 'ui-licenses', 'ViewAmendmentRoute', 'cloneAmendment'],
    (cloneableProperties) => ky.post(`${amendmentPath}/clone`, { json: cloneableProperties }).then(response => {
      // Make sure we refetch the license after we've added an amendment
      queryClient.invalidateQueries(LICENSE_ENDPOINT(licenseId));

      if (response.ok) {
        return response.text(); // Parse it as text
      } else {
        throw new Error(JSON_ERROR);
      }
    }).then(text => {
      const data = JSON.parse(text); // Try to parse it as json
      if (data.id) {
        return Promise.resolve(history.push(`${urls.editAmendment(data.id)}`)); // Location search is already a part of urls.editAmendment
      } else {
        throw new Error(INVALID_JSON_ERROR); // when the json response body doesn't contain an id
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
    // If we're coming from amendments, go back to amendments, else go back to license view
    if (location.pathname.startsWith('/licenses/amendments')) {
      history.push(`${appUrls.amendmentNativeView(licenseId, id)}${location.search}`);
    } else {
      history.push(`${appUrls.amendmentView(licenseId, id)}${location.search}`);
    }
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
          message={<FormattedMessage id="ui-licenses.amendments.delete.confirmMessage" values={{ name: amendment.name }} />}
          onCancel={hideDeleteConfirmationModal}
          onConfirm={deleteAmendment}
          open
        />
      )}
    </>
  );
};

ViewAmendmentRoute.propTypes = propTypes;

export default ViewAmendmentRoute;
