import React from 'react';
import PropTypes from 'prop-types';

import { MemoryRouter } from 'react-router-dom';
import { noop } from 'lodash';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor, renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../test/helpers';
import mockRefdata from '../../../test/jest/refdata';
import EditAmendmentRoute from './EditAmendmentRoute';

const match = {
  'path': '/licenses/:id/amendments/:amendmentId/edit',
  'url': '/licenses/f5362af1-abdf-4c0b-834a-2592b4af4ee9/amendments/0c059710-0999-40fc-a6a5-7b7ca10588e6/edit',
  'isExact': true,
  'params': {
    'id': 'f5362af1-abdf-4c0b-834a-2592b4af4ee9',
    'amendmentId': '0c059710-0999-40fc-a6a5-7b7ca10588e6'
  }
};


// TODO See ViewLicenseRoute for potential way to clean this up and expand
const CloseButton = (props) => {
  return <Button onClick={props.handlers.onClose}>CloseButton</Button>;
};

CloseButton.propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func,
  }),
};
const historyPushMock = jest.fn();

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicenseRefdata: () => mockRefdata,
}));

jest.mock('../../components/AmendmentForm', () => {
  return (props) => (
    <div>
      <div>AmendmentForm</div>
      <CloseButton {...props} />
    </div>
  );
});

const data = {
  history: {
    push: historyPushMock
  },
  location: {
    search: '',
    pathname: ''
  },
  mutator: {
    license: {
      PUT: noop
    }
  },
  match,
};

describe('EditAmendmentRoute', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <EditAmendmentRoute {...data} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the AmendmentForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('AmendmentForm')).toBeInTheDocument();
  });

  test('renders the CloseButton ', () => {
    const { getByText } = renderComponent;
    expect(getByText('CloseButton')).toBeInTheDocument();
  });

  describe('clicking the CloseButton', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await ButtonInteractor('CloseButton').click();
      });
    });

    test('triggers the CloseButton callback', async () => {
      await waitFor(() => {
        expect(historyPushMock).toHaveBeenCalled();
      });
    });
  });
});
