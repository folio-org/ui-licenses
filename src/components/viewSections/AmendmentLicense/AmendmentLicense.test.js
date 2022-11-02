import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { KeyValue } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import {license, urls} from './testResources';
import AmendmentLicense from './AmendmentLicense';

describe('AmendmentLicense', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <AmendmentLicense license={license} urls={urls}/>
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the expected parent license', () => {
    const { getByText } = renderComponent;
    expect(getByText(license.name)).toBeInTheDocument();
  });

  test('renders links with the parent license names', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('link', { name: 'TestLicense' })).toBeInTheDocument();
  });

  test('renders the expected License status', async () => {
    await KeyValue('Status').has({ value: 'Active' });
  });

  test('renders the expected License start date value', async () => {
    await KeyValue('Start date').has({ value: '6/1/2022' });
  });

  test('renders the expected License end date value', async () => {
    await KeyValue('End date').has({ value: '11/30/2022' });
  });

  test('renders the expected Licensor value', async () => {
    await KeyValue('Licensor').has({ value: 'Not set' });
  });
});
