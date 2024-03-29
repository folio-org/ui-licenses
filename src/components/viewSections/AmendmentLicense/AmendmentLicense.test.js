import { MemoryRouter } from 'react-router-dom';

import { KeyValue, renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../test/helpers';
import { license, urls } from './testResources';
import AmendmentLicense from './AmendmentLicense';

describe('AmendmentLicense', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <AmendmentLicense license={license} urls={urls} />
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

  it('renders the LicenseEndDate component', () => {
    const { getByText } = renderComponent;
    expect(getByText('LicenseEndDate')).toBeInTheDocument();
  });

  test('renders the expected Primary org value', async () => {
    await KeyValue('Primary organization').has({ value: 'Alexander Street Press' });
  });
});
