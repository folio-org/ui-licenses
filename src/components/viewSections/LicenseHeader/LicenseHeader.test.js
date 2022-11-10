
import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import license from './testResources';
import LicenseHeader from './LicenseHeader';

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
