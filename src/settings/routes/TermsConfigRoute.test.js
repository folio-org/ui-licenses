import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import TermsConfigRoute from './TermsConfigRoute';

jest.mock('../components/TermsConfigForm', () => () => <div>TermsConfigForm</div>);

const terms = {
  'hasLoaded': true,
  'isPending': false,
  'failed': false,
  'records': [],
  'successfulMutations': [],
  'failedMutations': [],
  'pendingMutations': [],
  'loadedAt': '2022-02-28T14:28:29.267Z',
  'url': 'https://folio-snapshot-okapi.dev.folio.org/licenses/custprops?sort=id%3Bdesc',
  'headers': {},
  'httpStatus': 200,
  'other': {
    'totalRecords': null
  },
  'resource': 'terms',
  'module': '@folio/licenses',
  'throwErrors': false
};

const pickLists = {
  'hasLoaded': true,
  'isPending': false,
  'failed': false,
  'records': [
    {
      'id': '02d318287f218761017f218a4ad4000a',
      'desc': 'DocumentAttachment.AtType',
      'internal': false,
      'values': [
        {
          'id': '02d318287f218761017f218a4ad8000b',
          'value': 'consortium_authorization_statement',
          'label': 'Consortium authorization statement'
        },
        {
          'id': '02d318287f218761017f218a4ae0000c',
          'value': 'product_data_sheet',
          'label': 'Product data sheet'
        },
        {
          'id': '02d318287f218761017f218a4ae9000d',
          'value': 'vendor_terms_and_conditions',
          'label': 'Vendor terms and conditions'
        }
      ]
    },
    {
      'id': '02d318287f218761017f218a4b69001b',
      'desc': 'FileStorageEngines',
      'internal': false,
      'values': [
        {
          'id': '02d318287f218761017f218a4b6c001c',
          'value': 'lob',
          'label': 'LOB'
        },
        {
          'id': '02d318287f218761017f218a4b71001d',
          'value': 's3',
          'label': 'S3'
        }
      ]
    },
    {
      'id': '02d318287f218761017f218a4af1000e',
      'desc': 'InternalContact.Role',
      'internal': false,
      'values': [
        {
          'id': '02d318287f218761017f218a4af5000f',
          'value': 'authorised_signatory',
          'label': 'Authorised signatory'
        },
        {
          'id': '02d318287f218761017f218a4afe0010',
          'value': 'erm_librarian',
          'label': 'ERM Librarian'
        },
        {
          'id': '02d318287f218761017f218a4b180013',
          'value': 'subject_specialist',
          'label': 'Subject specialist'
        },
        {
          'id': '02d318287f218761017f218a4b0e0012',
          'value': 'negotiator',
          'label': 'Negotiator'
        },
        {
          'id': '02d318287f218761017f218a4b070011',
          'value': 'license_owner',
          'label': 'License owner'
        }
      ]
    },
    {
      'id': '02d318287f218761017f218a4a630000',
      'desc': 'License.EndDateSemantics',
      'internal': true,
      'values': [
        {
          'id': '02d318287f218761017f218a4a960002',
          'value': 'open_ended',
          'label': 'Open ended'
        },
        {
          'id': '02d318287f218761017f218a4aa00003',
          'value': 'implicit',
          'label': 'Implicit'
        },
        {
          'id': '02d318287f218761017f218a4a8c0001',
          'value': 'explicit',
          'label': 'Explicit'
        }
      ]
    },
    {
      'id': '02d318287f218761017f218a4b210014',
      'desc': 'LicenseOrg.Role',
      'internal': false,
      'values': [
        {
          'id': '02d318287f218761017f218a4b240015',
          'value': 'licensor',
          'label': 'Licensor'
        }
      ]
    },
    {
      'id': '02d318287f218761017f218a4aa70004',
      'desc': 'License.Status',
      'internal': true,
      'values': [
        {
          'id': '02d318287f218761017f218a4ac40008',
          'value': 'rejected',
          'label': 'Rejected'
        },
        {
          'id': '02d318287f218761017f218a4abc0007',
          'value': 'active',
          'label': 'Active'
        },
        {
          'id': '02d318287f218761017f218a4aaa0005',
          'value': 'in_negotiation',
          'label': 'In negotiation'
        },
        {
          'id': '02d318287f218761017f218a4ab30006',
          'value': 'not_yet_active',
          'label': 'Not yet active'
        },
        {
          'id': '02d318287f218761017f218a4acc0009',
          'value': 'expired',
          'label': 'Expired'
        }
      ]
    },
    {
      'id': '02d318287f218761017f218a4b2b0016',
      'desc': 'License.Type',
      'internal': false,
      'values': [
        {
          'id': '02d318287f218761017f218a4b400019',
          'value': 'national',
          'label': 'National'
        },
        {
          'id': '02d318287f218761017f218a4b48001a',
          'value': 'alliance',
          'label': 'Alliance'
        },
        {
          'id': '02d318287f218761017f218a4b380018',
          'value': 'consortial',
          'label': 'Consortial'
        },
        {
          'id': '02d318287f218761017f218a4b2e0017',
          'value': 'local',
          'label': 'Local'
        }
      ]
    },
    {
      'id': '02d318287f218761017f218a4c050028',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        {
          'id': '02d318287f218761017f218a4c4e002f',
          'value': 'not_applicable',
          'label': 'Not applicable'
        },
        {
          'id': '02d318287f218761017f218a4c10002a',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287f218761017f218a4c26002c',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287f218761017f218a4c1d002b',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287f218761017f218a4c46002e',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287f218761017f218a4c2e002d',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287f218761017f218a4c080029',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        }
      ]
    },
    {
      'id': '02d318287f218761017f218a4bdd0024',
      'desc': 'Yes/No/Other',
      'internal': false,
      'values': [
        {
          'id': '02d318287f218761017f218a4bfe0027',
          'value': 'other_(see_notes)',
          'label': 'Other (see notes)'
        },
        {
          'id': '02d318287f218761017f218a4bee0026',
          'value': 'no',
          'label': 'No'
        },
        {
          'id': '02d318287f218761017f218a4be20025',
          'value': 'yes',
          'label': 'Yes'
        }
      ]
    }
  ],
  'successfulMutations': [],
  'failedMutations': [],
  'pendingMutations': [],
  'loadedAt': '2022-02-28T14:28:29.246Z',
  'url': 'https://folio-snapshot-okapi.dev.folio.org/licenses/refdata?perPage=100&sort=desc%3Basc',
  'headers': {},
  'httpStatus': 200,
  'other': {
    'totalRecords': null
  },
  'resource': 'pickLists',
  'module': '@folio/licenses',
  'throwErrors': true
};

const props = {
  resources: {
    terms,
    pickLists
  },
  mutator: {
    terms: {
      DELETE: jest.fn(),
      POST: jest.fn(),
      PUT: jest.fn(),
      cancel: jest.fn(),
    },
    pickLists: {
      DELETE: jest.fn(),
      POST: jest.fn(),
      PUT: jest.fn(),
      cancel: jest.fn(),
    },
  }
};

describe('TermsConfigRoute', () => {
  describe('renders the TermsConfigRoute', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TermsConfigRoute {...props} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the TermsConfigForm component', () => {
      const { getByText } = renderComponent;
      expect(getByText('TermsConfigForm')).toBeInTheDocument();
    });
  });
});
