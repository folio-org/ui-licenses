import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../test/helpers';

import LicenseLookup from './LicenseLookup';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  LicenseCard: () => <div>LicenseCard</div>,
}));

const license = {
  'id': '457fa9b8-da99-4aa0-9a9e-a03ed39053e2',
  'endDateSemantics': {
    'id': '02d3182883136dff018313b708960001',
    'value': 'explicit',
    'label': 'Explicit',
    'owner': {
      'id': '02d3182883136dff018313b7086b0000',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-10-19T13:34:00Z',
  'customProperties': {},
  'contacts': [
    {
      'id': '02d3182883c559420183f0736e210000',
      'owner': {
        'id': '457fa9b8-da99-4aa0-9a9e-a03ed39053e2'
      },
      'role': {
        'id': '02d3182883136dff018313b708f7000c',
        'value': 'erm_librarian',
        'label': 'ERM Librarian',
        'owner': {
          'id': '02d3182883136dff018313b708eb000a',
          'desc': 'InternalContact.Role',
          'internal': false
        }
      },
      'user': 'ee07f96c-5908-486b-9ee6-e1f7be227d65'
    }
  ],
  'tags': [],
  'lastUpdated': '2022-10-19T13:40:39Z',
  'docs': [],
  'name': 'CM test license 1',
  'status': {
    'id': '02d3182883136dff018313b708d10007',
    'value': 'active',
    'label': 'Active',
    'owner': {
      'id': '02d3182883136dff018313b708b50004',
      'desc': 'License.Status',
      'internal': true
    }
  },
  'supplementaryDocs': [],
  'description': 'test license',
  'startDate': '2022-10-01',
  'endDate': '2023-10-31',
  'openEnded': false,
  'amendments': [],
  'orgs': [
    {
      'id': '52296982-9e45-4ae2-97a0-6ebab15686cd',
      'primaryOrg': true,
      'org': {
        'id': 'f862bcfb-60ab-4383-ab69-a3ec43828a6a',
        'orgsUuid': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Alexander Street Press'
      },
      'owner': {
        'id': '457fa9b8-da99-4aa0-9a9e-a03ed39053e2'
      },
      'roles': [
        {
          'id': '679d8140-29dd-459b-8755-c7f11e97e034',
          'owner': {
            'id': '52296982-9e45-4ae2-97a0-6ebab15686cd'
          },
          'role': {
            'id': '02d3182883136dff018313b70972001a',
            'value': 'licensor',
            'label': 'Licensor',
            'owner': {
              'id': '02d3182883136dff018313b7096e0019',
              'desc': 'LicenseOrg.Role',
              'internal': false
            }
          },
          'note': 'test note'
        }
      ]
    }
  ],
  'type': {
    'id': '02d3182883136dff018313b709250011',
    'value': 'local',
    'label': 'Local',
    'owner': {
      'id': '02d3182883136dff018313b7091f0010',
      'desc': 'License.Type',
      'internal': false
    }
  },
  'alternateNames': [
    {
      'id': '499062e4-0e45-41e2-bde4-8cea07e3bd1c',
      'owner': {
        'id': '457fa9b8-da99-4aa0-9a9e-a03ed39053e2'
      },
      'name': 'test license'
    }
  ]
};

const lookupProps = {
  id: license.id,
  input: {
    name: 'license.id',
    value: license.id
  },
};

const emptyLookupProps = {
  input: {
    name: 'license.id'
  },
};

describe('LicenseLookup', () => {
  describe('renders the LicenseLookup with a resource', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <LicenseLookup
            {...lookupProps}
            resource={license}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the LicenseCard component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseCard')).toBeInTheDocument();
    });
  });

  describe('renders the LicenseLookup without resource', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <LicenseLookup {...emptyLookupProps} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders "No license linked" ', () => {
      const { getByText } = renderComponent;
      expect(getByText('No license linked')).toBeInTheDocument();
    });

    test('renders "Link a license to get started" ', () => {
      const { getByText } = renderComponent;
      expect(getByText('Link a license to get started')).toBeInTheDocument();
    });
  });
});
