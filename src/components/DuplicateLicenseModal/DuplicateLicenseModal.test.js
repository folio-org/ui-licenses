import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import DuplicateLicenseModal from './DuplicateLicenseModal';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  DuplicateModal: () => <div>DuplicateModal</div>,
}));

describe('DuplicateLicenseModal', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <DuplicateLicenseModal />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the DuplicateModal component', () => {
    const { getByText } = renderComponent;
    expect(getByText('DuplicateModal')).toBeInTheDocument();
  });
});
