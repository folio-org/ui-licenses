import { StaticRouter as Router } from 'react-router-dom';

import {
  Accordion,
  MultiColumnList,
  MultiColumnListCell,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import {
  amendment,
  id,
  license,
  visibleColumns,
} from './testResources';
import translationsProperties from '../../../../test/helpers';
import LicenseAgreements from './LicenseAgreements';

describe('LicenseAgreements', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <LicenseAgreements
          amendment={amendment}
          id={id}
          license={license}
          recordType="amendment"
          visibleColumns={visibleColumns}
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders the Agreements linked to the parent license Accordion', async () => {
    await Accordion('Agreements linked to the parent license').exists();
  });

  test('renders expected column count', async () => {
    await MultiColumnList({ columnCount: 7 }).exists();
  });

  test('renders expected columns', async () => {
    await MultiColumnList({ columns: ['', 'Name', 'Start date', 'End date', 'Agreement status', 'License link status', 'Amendment link status'] }).exists();
  });

  test('renders links with the parent license names', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('link', { name: 'MR Test Agreement' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'test' })).toBeInTheDocument();
  });

  test('renders expected startDate in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: '10/1/2022' }),
      await MultiColumnListCell({ row: 1, columnIndex: 2 }).has({ content: '10/7/2022' })
    ]);
  });

  test('renders expected endDate in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 3 }).has({ content: '10/31/2022' }),
      await MultiColumnListCell({ row: 1, columnIndex: 3 }).has({ content: 'No value set-' })
    ]);
  });

  test('renders expected Agreement status in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 4 }).has({ content: 'Active' }),
      await MultiColumnListCell({ row: 1, columnIndex: 4 }).has({ content: 'Active' })
    ]);
  });

  test('renders expected License link status in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 5 }).has({ content: 'Controlling' }),
      await MultiColumnListCell({ row: 1, columnIndex: 5 }).has({ content: 'Controlling' })
    ]);
  });

  test('renders expected Amendment link status in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 6 }).has({ content: 'Unassigned' }),
      await MultiColumnListCell({ row: 1, columnIndex: 6 }).has({ content: 'Unassigned' })
    ]);
  });
});
