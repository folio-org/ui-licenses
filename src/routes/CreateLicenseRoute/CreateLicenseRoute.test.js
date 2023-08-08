import React from 'react';
import PropTypes from 'prop-types';

import { MemoryRouter } from 'react-router-dom';

import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor, renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../test/helpers';
import CreateLicenseRoute from './CreateLicenseRoute';

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
  }
};

describe('CreateLicenseRoute', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <CreateLicenseRoute {...data} />
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
