import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import DuplicateAmendmentModal from './DuplicateAmendmentModal';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  DuplicateModal: () => <div>DuplicateModal</div>,
}));

describe('DuplicateAmendmentModal', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <DuplicateAmendmentModal />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the DuplicateModal component', () => {
    const { getByText } = renderComponent;
    expect(getByText('DuplicateModal')).toBeInTheDocument();
  });
});
