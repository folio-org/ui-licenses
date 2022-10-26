import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';

import LicensesCustomProperties from './LicensesCustomProperties';

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  CustomPropertiesSettings: () => <div>CustomPropertiesSettings</div>,
}));

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicensesContexts: jest.fn(() => ({ data: [] }))
}));

describe('LicensesCustomProperties', () => {
  describe('renders the LicensesCustomProperties', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <LicensesCustomProperties />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the CustomPropertiesSettings component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CustomPropertiesSettings')).toBeInTheDocument();
    });
  });
});
