import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router';
import { SearchField, MultiColumnList, Pane } from '@folio/stripes-testing';
import Licenses from './Licenses';
import {
  data,
  history,
  onCompareLicenseTerms,
  onNeedMoreData,
  queryGetter,
  querySetter,
  searchString,
  selectedRecordId,
  source
} from './testResources';
import translationsProperties from '../../../test/helpers';

jest.mock('../LicenseFilters', () => () => <div>LicenseFilters</div>);

describe('Licenses', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <Licenses
          data={data}
          history={history}
          onCompareLicenseTerms={onCompareLicenseTerms}
          onNeedMoreData={onNeedMoreData}
          queryGetter={queryGetter}
          querySetter={querySetter}
          searchString={searchString}
          selectedRecordId={selectedRecordId}
          source={source}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders the LicenseEndDate component', () => {
    const { getByText } = renderComponent;
    expect(getByText('LicenseEndDate')).toBeInTheDocument();
  });

  test('renders expected column headers', async () => {
    await MultiColumnList({ columns: [' ', 'Name', 'Type', 'Status', 'Start date', 'End date'] }).exists();
  });

  test('renders the expected Search and filter Pane', async () => {
    await Pane('Search and filter').is({ visible: true });
  });

  test('renders the expected Licenses Pane', async () => {
    await Pane('Licenses').is({ visible: true });
  });

  test('renders the expected search field', async () => {
    await SearchField().has({ id: 'input-license-search' });
  });
  it('renders the LicenseFilters component', () => {
    const { getByText } = renderComponent;
    expect(getByText('LicenseFilters')).toBeInTheDocument();
  });

  it('renders expected Hide search pane tooltip text', () => {
    const { getByText } = renderComponent;
    expect(getByText('Hide search pane')).toBeInTheDocument();
  });

  test('renders the Hide search pane button', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Hide search pane' }));
  });

  test('renders the Search button', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Search' }));
  });

  test('renders the Reset all button', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Reset all' }));
  });

  test('renders the Hide search pane tooltip', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('tooltip', { name: 'Hide search pane' }));
  });

  test('renders the Search Licenses searchbox', async () => {
    await SearchField().exists()
  });
});
