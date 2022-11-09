import React from 'react';
import PropTypes from 'prop-types';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor } from '@folio/stripes-testing';
import translationsProperties from '../../../test/helpers';
import EditLicenseRoute from './EditLicenseRoute';

const match = {
  'path': '/licenses/:id/edit',
  'url': '/licenses/f5362af1-abdf-4c0b-834a-2592b4af4ee9/edit',
  'isExact': true,
  'params': {
    'id': 'f5362af1-abdf-4c0b-834a-2592b4af4ee9'
  }
};

const CloseButton = (props) => {
  return <Button onClick={props.handlers.onClose}>CloseButton</Button>;
};

CloseButton.propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func,
  }),
};
const historyPushMock = jest.fn();

jest.mock('../../components/LicenseForm', () => {
  return (props) => (
    <div>
      <div>LicenseForm</div>
      <CloseButton {...props} />
    </div>
  );
});

const data = {
  history: {
    push: historyPushMock
  },
  location: {
    search: ''
  },
  match
};

describe('EditLicenseRoute', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <EditLicenseRoute {...data} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the LicenseForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('LicenseForm')).toBeInTheDocument();
  });

  test('renders the CloseButton ', () => {
    const { getByText } = renderComponent;
    expect(getByText('CloseButton')).toBeInTheDocument();
  });

  test('triggers the CloseButton callback', async () => {
    await ButtonInteractor('CloseButton').click();
    expect(historyPushMock).toHaveBeenCalled();
  });
});
