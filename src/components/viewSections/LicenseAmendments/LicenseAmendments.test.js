import { MemoryRouter } from 'react-router-dom';

import {
  Accordion,
  MultiColumnListCell,
  MultiColumnList,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import {
  licenseAmendmentsAccordionLabel,
  record,
  recordType,
  id,
  urls,
  handlers,
  license
} from './testResources';
import translationsProperties from '../../../../test/helpers';
import LicenseAmendments from './LicenseAmendments';

describe('LicenseAmendments', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <LicenseAmendments
          handlers={handlers}
          id={id}
          license={license}
          licenseAmendmentsAccordionLabel={licenseAmendmentsAccordionLabel}
          record={record}
          recordType={recordType}
          urls={urls}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Amendments Accordion', async () => {
    await Accordion('Amendments').exists();
  });

  test('renders Add amendment button', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Add amendment' })).toBeInTheDocument();
  });

  test('renders expected column count', async () => {
    await MultiColumnList({ columnCount: 4 }).exists();
  });

  test('renders expected columns', async () => {
    await MultiColumnList({ columns: ['Name', 'Status', 'Start date', 'End date'] }).exists();
  });

  test('renders expected Name in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'Amendment test 2' }),
      await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: 'Amendment test' })
    ]);
  });

  test('renders expected Status in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: 'Active' }),
      await MultiColumnListCell({ row: 1, columnIndex: 1 }).has({ content: 'Active' })
    ]);
  });

  test('renders expected Start date in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: '10/10/2022' }),
      await MultiColumnListCell({ row: 1, columnIndex: 2 }).has({ content: '10/1/2022' })
    ]);
  });

  test('renders expected End date in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 3 }).has({ content: 'LicenseEndDate' }),
      await MultiColumnListCell({ row: 1, columnIndex: 3 }).has({ content: 'LicenseEndDate' })
    ]);
  });
});
