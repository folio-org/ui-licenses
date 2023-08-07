import PropTypes from 'prop-types';

import { MemoryRouter } from 'react-router-dom';

import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor, renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../test/helpers';
import ViewLicenseRoute from './ViewLicenseRoute';


const CloneButton = (props) => {
  return <Button onClick={() => props.handlers.onClone}>CloneButton</Button>;
};

const CloseButton = (props) => {
  return <Button onClick={props.handlers.onClose}>CloseButton</Button>;
};

const DeleteButton = (props) => {
  return <Button onClick={props.handlers.onDelete}>DeleteButton</Button>;
};

const EditButton = (props) => {
  return <Button onClick={props.handlers.onEdit}>EditButton</Button>;
};

const ViewAmendmentButton = (props) => {
  return <Button onClick={props.handlers.onAmendmentClick}>ViewAmendmentButton</Button>;
};

const HandleToggleHelperButton = (props) => {
  return <Button onClick={props.handlers.onToggleHelper}>HandleToggleHelperButton</Button>;
};

const HandleToggleTagsButton = (props) => {
  return <Button onClick={props.handlers.onToggleTags}>HandleToggleTagsButton</Button>;
};

CloneButton.propTypes = {
  handlers: PropTypes.shape({
    onClone: PropTypes.func,
  }),
};

CloseButton.propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func,
  }),
};

DeleteButton.propTypes = {
  handlers: PropTypes.shape({
    onDelete: PropTypes.func,
  }),
};

EditButton.propTypes = {
  handlers: PropTypes.shape({
    onEdit: PropTypes.func,
  }),
};

ViewAmendmentButton.propTypes = {
  handlers: PropTypes.shape({
    onAmendmentClick: PropTypes.func,
  }),
};

HandleToggleHelperButton.propTypes = {
  handlers: PropTypes.shape({
    onToggleHelper: PropTypes.func,
  }),
};

HandleToggleTagsButton.propTypes = {
  handlers: PropTypes.shape({
    onToggleTags: PropTypes.func,
  }),
};

const historyPushMock = jest.fn();

jest.mock('../../components/License', () => {
  return (props) => (
    <div>
      <div>License</div>
      <CloneButton {...props} />
      <CloseButton {...props} />
      <DeleteButton {...props} />
      <EditButton {...props} />
      <ViewAmendmentButton {...props} />
      <HandleToggleHelperButton {...props} />
      <HandleToggleTagsButton {...props} />
    </div>
  );
});

const data = {
  history: {
    push: historyPushMock
  },
  location: {
    'pathname': '/licenses/766aea02-9071-4cec-a6ef-3ed8208194de',
    'search': '?filters=status.active&sort=name',
  },
  match: {
    'path': '/licenses/:id',
    'url': '/licenses/e73d0d15-17ca-43cc-a4ee-3e800ac1c4d5',
    'isExact': true,
    'params': {
      'id': 'e73d0d15-17ca-43cc-a4ee-3e800ac1c4d5'
    }
  },
};

describe('ViewLicenseRoute', () => {
  describe('rendering the ViewLicenseRoute', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <ViewLicenseRoute {...data} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the License component', () => {
      const { getByText } = renderComponent;
      expect(getByText('License')).toBeInTheDocument();
    });

    test('renders the CloneButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('CloneButton')).toBeInTheDocument();
    });

    test('renders the CloseButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('CloseButton')).toBeInTheDocument();
    });

    test('triggers the CloseButton callback', async () => {
      await ButtonInteractor('CloseButton').click();
      expect(historyPushMock).toHaveBeenCalled();
    });

    test('renders the DeleteButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('DeleteButton')).toBeInTheDocument();
    });

    test('renders the EditButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('EditButton')).toBeInTheDocument();
    });

    test('triggers the ViewAmendmentButton callback', async () => {
      await ButtonInteractor('ViewAmendmentButton').click();
      expect(historyPushMock).toHaveBeenCalled();
    });

    test('renders the ViewAmendmentButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('ViewAmendmentButton')).toBeInTheDocument();
    });

    test('renders the HandleToggleTagsButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('HandleToggleTagsButton')).toBeInTheDocument();
    });

    test('renders the HandleToggleHelperButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('HandleToggleHelperButton')).toBeInTheDocument();
    });
  });
});
