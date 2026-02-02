import { MemoryRouter } from 'react-router-dom';

import {
  Accordion,
  Checkbox,
  renderWithIntl,
} from '@folio/stripes-erm-testing';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import translationsProperties from '../../../test/helpers';
import AmendmentFilters from './AmendmentFilters';

const stateMock = jest.fn();

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  SimpleAccessControlFilter: () => <div>SimpleAccessControlFilter</div>,
}));

const activeFilters = {
  'status': [
    'active'
  ]
};

const data = {
  'documentAtTypeValues': [
    {
      'id': '2c9180958abb5845018abb63d4580014',
      'value': 'consortium_authorization_statement',
      'label': 'Consortium authorization statement'
    },
    {
      'id': '2c9180958abb5845018abb63d4600015',
      'value': 'product_data_sheet',
      'label': 'Product data sheet'
    },
    {
      'id': '2c9180958abb5845018abb63d4690016',
      'value': 'vendor_terms_and_conditions',
      'label': 'Vendor terms and conditions'
    }
  ],
  'statusValues': [{
    'id': '2c91809d821bd92801821bdfdde10018',
    'value': 'active',
    'label': 'Active'
  },
  {
    'id': '2c91809d821bd92801821bdfddf0001a',
    'value': 'expired',
    'label': 'Expired'
  },
  {
    'id': '2c91809d821bd92801821bdfddd30016',
    'value': 'in_negotiation',
    'label': 'In negotiation'
  },
  {
    'id': '2c91809d821bd92801821bdfddd90017',
    'value': 'not_yet_active',
    'label': 'Not yet active'
  },
  {
    'id': '2c91809d821bd92801821bdfdde90019',
    'value': 'rejected',
    'label': 'Rejected'
  }
  ],
};

const filterHandlers = {
  state: stateMock,
  checkbox: () => { },
  clear: () => { },
  clearGroup: () => { },
  reset: () => { },
  stat: () => { },
};

describe('AmendmentFilters', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <AmendmentFilters
          activeFilters={activeFilters}
          data={data}
          filterHandlers={filterHandlers}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Status Accordion', async () => {
    await Accordion('Status').exists();
  });


  test('renders SimpleAccessControlFilter component', () => {
    const { getByText } = renderComponent;
    expect(getByText('SimpleAccessControlFilter')).toBeInTheDocument();
  });

  test('clicking the active checkbox', async () => {
    await waitFor(async () => {
      await Checkbox({ id: 'clickable-filter-status-active' }).click();
    });

    await waitFor(() => {
      expect(stateMock.mock.calls.length).toEqual(1);
    });
  });

  test('clicking the expired checkbox', async () => {
    await waitFor(async () => {
      await Checkbox({ id: 'clickable-filter-status-expired' }).click();
    });

    await waitFor(() => {
      expect(stateMock.mock.calls.length).toEqual(2);
    });
  });

  test('clicking the in negotiation checkbox', async () => {
    await waitFor(async () => {
      await Checkbox({ id: 'clickable-filter-status-in-negotiation' }).click();
    });

    await waitFor(() => {
      expect(stateMock.mock.calls.length).toEqual(3);
    });
  });

  test('clicking the not yet active checkbox', async () => {
    await waitFor(async () => {
      await Checkbox({ id: 'clickable-filter-status-not-yet-active' }).click();
    });

    await waitFor(() => {
      expect(stateMock.mock.calls.length).toEqual(4);
    });
  });

  test('clicking the rejected checkbox', async () => {
    await waitFor(async () => {
      await Checkbox({ id: 'clickable-filter-status-rejected' }).click();
    });

    await waitFor(() => {
      expect(stateMock.mock.calls.length).toEqual(5);
    });
  });

  test('renders the Supplementary documents Accordion', async () => {
    await Accordion('Supplementary documents').exists();
  });

  test('renders the Core documents Accordion', async () => {
    await Accordion('Core documents').exists();
  });

  test('renders the Amendment content Accordion', async () => {
    await Accordion('Amendment content').exists();
  });
});
