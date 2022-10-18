
import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../../test/helpers';
import license from './testResources';
import LicenseHeader from './LicenseHeader';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  LicenseCard: () => <div>LicenseCard</div>,
}));

describe('LicenseHeader', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <LicenseHeader
          license={license}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });


  test('renders the LicenseCard component', () => {
    const { getByText } = renderComponent;
    expect(getByText('LicenseCard')).toBeInTheDocument();
  });
});
