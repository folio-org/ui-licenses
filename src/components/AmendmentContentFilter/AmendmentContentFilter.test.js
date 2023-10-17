import {
  Select,
  MultiSelect,
  Dropdown,
  renderWithIntl,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import AmendmentContentFilter from './AmendmentContentFilter';

const stateMock = jest.fn();

const activeFilters = {
  'status': [
    'active'
  ],
  'amendmentContent': [
    '(tags isNotEmpty)&&(docs isNotEmpty)'
  ]
};

const data = {
  'amendmentContentFilters': [
    '(tags isNotEmpty)&&(docs isNotEmpty)'
  ],
  'filterHandlers': {
    state: stateMock,
    checkbox: () => { },
    clear: () => { },
    clearGroup: () => { },
    reset: () => { },
  },
  'name': 'amendmentContent'
};

describe('AmendmentContentFilter', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <AmendmentContentFilter
          activeFilters={activeFilters}
          amendmentContentFieldArrays={[]}
          data={data}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Has/Has not field', async () => {
    await Select({ id: 'amendmentContent[0]-attribute-select' }).exists();
  });

  test('renders the Content field', async () => {
    await MultiSelect({
      id: 'amendmentContent[0]-content-multi-select',
    }).exists();
  });

  test('renders the And/Or dropdown', async () => {
    await Dropdown('Add filter').exists();
  });
});
