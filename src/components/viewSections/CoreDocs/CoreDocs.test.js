
import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { Accordion } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import { id, record, recordType } from './testResources';
import CoreDocs from './CoreDocs';

describe('CoreDocs', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <CoreDocs
          id={id}
          record={record}
          recordType={recordType}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the core documents Accordion', async () => {
    await Accordion('Core documents').exists();
  });

  test('renders the DocumentCard component', () => {
    const { getByText } = renderComponent;
    expect(getByText('DocumentCard')).toBeInTheDocument();
  });
});
