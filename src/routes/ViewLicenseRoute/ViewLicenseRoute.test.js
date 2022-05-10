import React from 'react';
import PropTypes from 'prop-types';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { noop } from 'lodash';
import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor } from '@folio/stripes-testing';
import {
  tagsEnabled,
  handlers,
  match,
  okapi,
  interfaces,
  interfacesCredentials,
  license,
  linkedAgreements,
  terms,
  users,
  interfaceRecord,
  tagSettings
} from './testResources';
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

const HandleFetchCredentialsButton = (props) => {
  return <Button onClick={props.handlers.onFetchCredentials}>HandleFetchCredentialsButton</Button>;
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

HandleFetchCredentialsButton.propTypes = {
  handlers: PropTypes.shape({
    onFetchCredentials: PropTypes.func,
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
const hasPermMock = jest.fn();
const mutatorInterfaceMock = jest.fn();
const mutatorQueryMock = jest.fn();

jest.mock('../../components/License', () => {
  return (props) => (
    <div>
      <div>License</div>
      <CloneButton {...props} />
      <CloseButton {...props} />
      <DeleteButton {...props} />
      <EditButton {...props} />
      <HandleFetchCredentialsButton {...props} />
      <ViewAmendmentButton {...props} />
      <HandleToggleHelperButton {...props} />
      <HandleToggleTagsButton {...props} />
    </div>
  );
});

const data = {
  tagsEnabled,
  handlers,
  history: {
    push: historyPushMock
  },
  location: {
    'pathname': '/licenses/766aea02-9071-4cec-a6ef-3ed8208194de',
    'search': '?filters=status.active&sort=name',
  },
  mutator: {
    interfaceRecord: {
      replace: mutatorInterfaceMock
    },
    license: {
      DELETE: noop
    },
    query: {
      update: mutatorQueryMock
    }
  },
  match,
  resources: {
    interfaces,
    interfacesCredentials,
    license,
    linkedAgreements,
    terms,
    users,
    interfaceRecord,
    query:{
      helper: '',
    },
    tagSettings,
  },
  stripes: {
    hasPerm: hasPermMock,
    okapi: {
      tenant: 'diku',
      token: 'okapi-token',
    }
  },
  okapi
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

    test('triggers the HandleFetchCredentialsButton callback', async () => {
      await ButtonInteractor('HandleFetchCredentialsButton').click();
      expect(mutatorInterfaceMock).toHaveBeenCalled();
    });

    test('renders the HandleFetchCredentialsButton ', () => {
      const { getByText } = renderComponent;
      expect(getByText('HandleFetchCredentialsButton')).toBeInTheDocument();
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
