
import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import license from './testResources';
import LicenseInternalContacts from './LicenseInternalContacts';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  InternalContactCard: () => <div>InternalContactCard</div>,
}));

describe('CoreDocs', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <LicenseInternalContacts
          id="licenseInternalContacts"
          license={license}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Internal contacts Accordion', async () => {
    await Accordion('Internal contacts').exists();
  });

  test('renders the InternalContactCard component', () => {
    const { getByText } = renderComponent;
    expect(getByText('InternalContactCard')).toBeInTheDocument();
  });
});
