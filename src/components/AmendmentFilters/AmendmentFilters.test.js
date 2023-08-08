import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { Accordion, Checkbox } from '@folio/stripes-testing';
import { waitFor } from '@testing-library/dom';
import translationsProperties from '../../../test/helpers';
import AmendmentFilters from './AmendmentFilters';

const stateMock = jest.fn();

const activeFilters = {
  'status': [
    'active'
  ]
};

const data = {
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
  // let renderComponent;
  beforeEach(() => {
    renderWithIntl(
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
});
