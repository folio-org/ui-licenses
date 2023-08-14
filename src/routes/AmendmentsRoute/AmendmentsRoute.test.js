
import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';

import { MemoryRouter } from 'react-router-dom';

import { useStripes } from '@folio/stripes/core';
import translationsProperties from '../../../test/helpers';
import AmendmentsRoute from './AmendmentsRoute';
import mockRefdata from '../../../test/jest/refdata';

/* The below mock is not needed, but was previously present, and this represents the best currently
 * known way of mocking a specific stripes-component within this manual-mock setup

 * jest.mock('@folio/stripes-components/lib/Selection', () => () => <div>Selection</div>);
 */

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicensesSettings: jest.fn(() => ({ data: { configs: [{}] } })),
  useLicensesRefdata: () => mockRefdata,
}));

const routeProps = {
  history: {
    push: () => jest.fn()
  },
  location: {},
  match: {
    params: {},
  },
};

describe('AmendmentsRoute', () => {
  describe('rendering the route with permissions', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <AmendmentsRoute {...routeProps} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the amendments component', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('amendments')).toBeInTheDocument();
    });

    describe('re-rendering the route', () => { // makes sure that we hit the componentDidUpdate block
      beforeEach(() => {
        renderWithIntl(
          <MemoryRouter>
            <AmendmentsRoute {...routeProps} />
          </MemoryRouter>,
          translationsProperties,
          renderComponent.rerender
        );
      });

      test('renders the amendments component', () => {
        const { getByTestId } = renderComponent;
        expect(getByTestId('amendments')).toBeInTheDocument();
      });
    });
  });

  describe('rendering with no permissions', () => {
    let renderComponent;
    beforeEach(() => {
      const { hasPerm } = useStripes();
      hasPerm.mockImplementation(() => false);
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <AmendmentsRoute
            {...routeProps}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('displays the permission error', () => {
      const { getByText } = renderComponent;
      expect(getByText('Sorry - your permissions do not allow access to this page.')).toBeInTheDocument();
    });
  });
});
