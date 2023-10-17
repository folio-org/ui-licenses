import {
  Select,
  MultiSelect,
  Dropdown,
  renderWithIntl,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import LicenseContentFilter from './LicenseContentFilter';

const stateMock = jest.fn();

const activeFilters = {
  'status': [
    'active'
  ],
  'licenseContent': [
    '(alternateNames isNotEmpty)'
  ]
};

const data = {
  'filterHandlers': {
    state: stateMock,
    checkbox: () => { },
    clear: () => { },
    clearGroup: () => { },
    reset: () => { },
  },
  'licenseContentFilters': [
    '(alternateNames isNotEmpty)'
  ],
  'name': 'licenseContent'
};

describe('LicenseContentFilter', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <LicenseContentFilter
          activeFilters={activeFilters}
          data={data}
          licenseContentFilters={[]}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Has/Has not field', async () => {
    await Select({ id: 'licenseContent[0]-attribute-select' }).exists();
  });

  test('renders the Content field', async () => {
    await MultiSelect({
      id: 'licenseContent[0]-content-multi-select',
    }).exists();
  });

  test('renders the And/Or dropdown', async () => {
    await Dropdown('Add filter').exists();
  });
});
