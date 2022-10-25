
import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import record from './testResources';
import SupplementaryDocs from './SupplementaryDocs';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  DocumentCard: () => <div>DocumentCard</div>,
}));

describe('SupplementaryDocs', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SupplementaryDocs
          id="licenseSupplement"
          record={record}
          recordType="license"

        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Supplementary documents Accordion', async () => {
    await Accordion('Supplementary documents').exists();
  });

  test('renders the DocumentCard component', () => {
    const { getByText } = renderComponent;
    expect(getByText('DocumentCard')).toBeInTheDocument();
  });
});
