import { MemoryRouter } from 'react-router';

import {
  MultiColumnList,
  Pane,
  renderWithIntl,
  SearchField,
} from '@folio/stripes-erm-testing';

import Amendments from './Amendments';
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

jest.mock('../AmendmentFilters', () => () => <div>AmendmentFilters</div>);

describe('Amendments', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <Amendments
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

  test('renders expected column headers', async () => {
    await MultiColumnList({ columns: ['Name', 'Status', 'Start date', 'End date', 'Parent license'] }).exists();
  });

  test('renders the expected Search and filter Pane', async () => {
    await Pane('Search and filter').is({ visible: true });
  });

  test('renders the expected Amendments Pane', async () => {
    await Pane('Amendments').is({ visible: true });
  });

  test('renders the expected search field', async () => {
    await SearchField().has({ id: 'input-amendment-search' });
  });
  it('renders the AmendmentFilters component', () => {
    const { getByText } = renderComponent;
    expect(getByText('AmendmentFilters')).toBeInTheDocument();
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

  test('renders the Search Amendments searchbox', async () => {
    await SearchField().exists();
  });
});
