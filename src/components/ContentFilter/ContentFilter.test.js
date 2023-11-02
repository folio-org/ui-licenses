import {
  Select,
  MultiSelect,
  Dropdown,
  renderWithIntl,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import { activeFilters } from './testResources';
import ContentFilter from './ContentFilter';

const stateMock = jest.fn();

const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};
describe('ContentFilter', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <ContentFilter
          activeFilters={activeFilters}
          filterHandlers={filterHandlers}
          name="contentFilters"
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Has/Has not field', async () => {
    await Select({ id: 'contentFilters[0]-attribute-select' }).exists();
  });

  test('renders the Content field', async () => {
    await MultiSelect({
      id: 'contentFilters[0]-content-multi-select',
    }).exists();
  });

  test('renders the And/Or dropdown', async () => {
    await Dropdown('Add filter').exists();
  });
});
