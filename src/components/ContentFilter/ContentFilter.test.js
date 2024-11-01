import {
  Select,
  // MultiSelect, // TODO this should be used once we get a handle on why it fails for npm-folio builds
  Dropdown,
  renderWithIntl,
} from '@folio/stripes-erm-testing';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import { activeFilters, data } from './testResources';
import ContentFilter from './ContentFilter';

const stateMock = jest.fn();

const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};
describe('ContentFilter without active filters', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <ContentFilter
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

  // TODO This fails in npm-folio builds but not npm-folioci. See also mod-agreements ContentFilter test
  test('renders the Content field', async () => {
    // As a placeholder just check how many comboboxes render. It's 2 per multi select -.-
    const { getAllByRole } = renderComponent;
    await waitFor(() => {
      expect(getAllByRole('combobox').length).toBe(2);
    });
    // For now use jest getters, but we should get this back for next release if possible.
    /* await MultiSelect({
      id: 'contentFilters[0]-content-multi-select',
    }).exists(); */
  });

  test('renders the And/Or dropdown', async () => {
    await Dropdown('Add filter').exists();
  });
});

describe('ContentFilter with active filters', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <ContentFilter
          activeFilters={activeFilters}
          contentOptions={data.contentOptions}
          filterHandlers={filterHandlers}
          name="contentFilters"
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Has/Has not fields with expected values', async () => {
    await Select({ id: 'contentFilters[0]-attribute-select' }).has({
      value: ' isNotEmpty',
    });
    await Select({ id: 'contentFilters[1]-attribute-select' }).has({
      value: ' isEmpty',
    });
  });

  // TODO See above
  test('renders the Content fields with expected values', async () => {
    // As a placeholder just check how many comboboxes render. It's 2 per multi select -.-
    const { getAllByRole } = renderComponent;
    await waitFor(() => {
      expect(getAllByRole('combobox').length).toBe(4);
    });

    /* await MultiSelect({
      id: 'contentFilters[0]-content-multi-select',
    }).has({ selected: ['Amendments'] });
    await MultiSelect({
      id: 'contentFilters[1]-content-multi-select',
    }).has({ selected: ['Core documents'] }); */
  });

  test('changing the value within the attribute select invokes the callback', async () => {
    await waitFor(async () => {
      await Select({ id: 'contentFilters[0]-attribute-select' }).choose(
        'Has not'
      );
    });
    expect(filterHandlers.state.mock.calls.length).toBe(1);
  });
});
