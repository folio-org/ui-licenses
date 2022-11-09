import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import DuplicateAmendmentModal from './DuplicateAmendmentModal';

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
