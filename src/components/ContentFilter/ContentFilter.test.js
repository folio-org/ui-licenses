import {
  Select,
  MultiSelect,
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
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <ContentFilter filterHandlers={filterHandlers} name="contentFilters" />
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

describe('ContentFilter with active filters', () => {
  beforeEach(() => {
    renderWithIntl(
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

  test('renders the Content fields with expected values', async () => {
    await MultiSelect({
      id: 'contentFilters[0]-content-multi-select',
    }).has({ selected: ['Amendments'] });
    await MultiSelect({
      id: 'contentFilters[1]-content-multi-select',
    }).has({ selected: ['Core documents'] });
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
