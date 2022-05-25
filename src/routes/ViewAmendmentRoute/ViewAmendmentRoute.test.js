import React from 'react';
import PropTypes from 'prop-types';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { mockErmComponents, renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { noop } from 'lodash';
import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor } from '@folio/stripes-testing';
import { handlers, resources, okapi } from './testResources';
import translationsProperties from '../../../test/helpers';
import ViewAmendmentRoute from './ViewAmendmentRoute';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  ...mockErmComponents,
  OrganizationSelection: () => <div>OrganizationSelection</div>,
}));

const CloseButton = (props) => {
  return <Button onClick={props.handlers.onClose}>CloseButton</Button>;
};

const DeleteButton = (props) => {
  return <Button onClick={props.handlers.onDelete}>DeleteButton</Button>;
};

const CloneButton = (props) => {
  return <Button onClick={props.handlers.onClone}>CloneButton</Button>;
};

const EditAmendmentButton = (props) => {
  return <Button onClick={props.handlers.onEditAmendment}>EditAmendmentButton</Button>;
};

const ViewAmendmentButton = (props) => {
  return <Button onClick={props.handlers.onAmendmentClick}>ViewAmendmentButton</Button>;
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

CloneButton.propTypes = {
  handlers: PropTypes.shape({
    onClone: PropTypes.func,
  }),
};

EditAmendmentButton.propTypes = {
  handlers: PropTypes.shape({
    onEditAmendment: PropTypes.func,
  }),
};

ViewAmendmentButton.propTypes = {
  handlers: PropTypes.shape({
    onAmendmentClick: PropTypes.func,
  }),
};

const historyPushMock = jest.fn();
const hasPermMock = jest.fn();

jest.mock('../../components/Amendment', () => {
  return (props) => (
    <div>
      <div>Amendment</div>
      <CloseButton {...props} />
      <DeleteButton {...props} />
      <CloneButton {...props} />
      <EditAmendmentButton {...props} />
      <ViewAmendmentButton {...props} />
    </div>
  );
});

const data = {
  handlers,
  history: {
    push: historyPushMock
  },
  location: {
    search: ''
  },
  mutator: {
    license: {
      PUT: noop
    }
  },
  match: {
    params: {
      amendmentId: 'd758b0e4-1bcd-43b6-a6aa-99a12f7a402e…',
      id: '766aea02-9071-4cec-a6ef-3ed8208194de'
    },
  },
  resources: {
    resources
  },
  stripes: {
    hasPerm: hasPermMock,
    okapi
  }
};

describe('ViewAmendmentRoute', () => {
  describe('rendering the ViewAmendmentRoute', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <ViewAmendmentRoute {...data} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Amendment component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Amendment')).toBeInTheDocument();
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

    test('renders the CloneButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('CloneButton')).toBeInTheDocument();
    });

    test('renders the EditAmendmentButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('EditAmendmentButton')).toBeInTheDocument();
    });


    test('renders the ViewAmendmentButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('ViewAmendmentButton')).toBeInTheDocument();
    });

    test('triggers the ViewAmendmentButton callback', async () => {
      await ButtonInteractor('ViewAmendmentButton').click();
      expect(historyPushMock).toHaveBeenCalled();
    });
  });
});
