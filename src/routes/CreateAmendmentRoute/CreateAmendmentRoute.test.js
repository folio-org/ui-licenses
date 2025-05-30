import React from 'react';
import PropTypes from 'prop-types';

import { MemoryRouter } from 'react-router-dom';
import { noop } from 'lodash';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor, renderWithIntl } from '@folio/stripes-erm-testing';

import {
  match,
  resources,
} from './testResources';
import translationsProperties from '../../../test/helpers';
import CreateAmendmentRoute from './CreateAmendmentRoute';
import mockRefdata from '../../../test/jest/refdata';

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
const hasPermMock = jest.fn();

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
    search: ''
  },
  mutator: {
    license: {
      PUT: noop
    }
  },
  match,
  resources: { resources },
  stripes: {
    hasPerm: hasPermMock,
    okapi: {
      tenant: 'diku',
      token: 'okapi-token',
    }
  }
};

describe('CreateAmendmentRoute', () => {
  describe('rendering the route', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <CreateAmendmentRoute {...data} />
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
});
