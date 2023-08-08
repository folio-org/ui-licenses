
import { MemoryRouter } from 'react-router-dom';

import { KeyValue, renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../test/helpers';
import amendment from './testResources';
import AmendmentInfo from './AmendmentInfo';

describe('AmendmentInfo', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <AmendmentInfo amendment={amendment} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the expected headline', () => {
    const { getByText } = renderComponent;
    expect(getByText(amendment.name)).toBeInTheDocument();
  });

  test('renders the expected headline value', () => {
    const { getByText } = renderComponent;
    expect(getByText('MR test amendment')).toBeInTheDocument();
  });

  test('renders the expected Amendment status', async () => {
    await KeyValue('Amendment status').has({ value: 'Active' });
  });

  test('renders the expected Amendment start date value', async () => {
    await KeyValue('Amendment start date').has({ value: '10/1/2022' });
  });

  test('renders the expected Description value', async () => {
    await KeyValue('Description').has({ value: 'MR test amendment description.' });
  });
});
