import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MultiColumnList, MultiColumnListCell } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import LicenseInfo from './LicenseInfo';

const license = {
  'id': '457fa9b8-da99-4aa0-9a9e-a03ed39053e2',
  'description': 'test license',
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
      'user': {
        'username': 'acq-admin',
        'id': 'ee07f96c-5908-486b-9ee6-e1f7be227d65',
        'barcode': '1646103744285654519',
        'active': true,
        'type': 'patron',
        'patronGroup': '3684a786-6671-4268-8ed0-9db82ebca60b',
        'departments': [],
        'proxyFor': [],
        'personal': {
          'lastName': 'Admin',
          'firstName': 'acq-admin',
          'addresses': []
        },
        'createdDate': '2022-03-01T03:02:24.319+00:00',
        'updatedDate': '2022-03-01T03:02:24.319+00:00',
        'metadata': {
          'createdDate': '2022-03-01T03:02:24.313+00:00',
          'createdByUserId': '246d5b6c-7772-5077-820d-54f90c23094e',
          'updatedDate': '2022-03-01T03:02:24.313+00:00',
          'updatedByUserId': '246d5b6c-7772-5077-820d-54f90c23094e'
        }
      }
    }
  ],
  'tags': [],
  'lastUpdated': '2022-10-19T13:34:32Z',
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
        'name': 'Alexander Street Press',
        'orgsUuid_object': {
          'id': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
          'name': 'Alexander Street Press',
          'code': 'ALEXS',
          'description': 'AV streaming services',
          'exportToAccounting': false,
          'status': 'Active',
          'language': 'en-us',
          'aliases': [
            {
              'value': 'Alexander Street',
              'description': ''
            }
          ],
          'addresses': [
            {
              'addressLine1': '3212 Duke Street',
              'addressLine2': '',
              'city': 'Alexandria',
              'stateRegion': 'VA',
              'zipCode': '22314',
              'country': 'USA',
              'isPrimary': true,
              'categories': [],
              'language': 'English'
            }
          ],
          'phoneNumbers': [
            {
              'phoneNumber': '1-800-889-5937',
              'categories': [],
              'isPrimary': true,
              'language': 'English'
            }
          ],
          'emails': [
            {
              'value': 'customerservice@alexanderstreet.com',
              'description': 'main customer service email',
              'isPrimary': true,
              'categories': [],
              'language': 'English'
            }
          ],
          'urls': [
            {
              'value': 'https://alexanderstreet.com/',
              'description': 'main website',
              'language': 'en-us',
              'isPrimary': true,
              'categories': [
                'f52ceea4-8e35-404b-9ebd-5c7db6613195'
              ],
              'notes': ''
            }
          ],
          'contacts': [
            '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1'
          ],
          'agreements': [
            {
              'name': 'library access',
              'discount': 0,
              'referenceUrl': '',
              'notes': ''
            }
          ],
          'erpCode': 'G64758-74828',
          'paymentMethod': 'Physical Check',
          'accessProvider': true,
          'governmental': false,
          'licensor': true,
          'materialSupplier': true,
          'vendorCurrencies': [
            'USD'
          ],
          'claimingInterval': 0,
          'discountPercent': 0,
          'expectedActivationInterval': 1,
          'expectedInvoiceInterval': 30,
          'renewalActivationInterval': 365,
          'subscriptionInterval': 365,
          'expectedReceiptInterval': 30,
          'taxId': '',
          'liableForVat': false,
          'taxPercentage': 0,
          'interfaces': [
            '14e81009-0f98-45a0-b8e6-e25547beb22f'
          ],
          'accounts': [
            {
              'name': 'Library account',
              'accountNo': '1234',
              'description': 'Main library account',
              'appSystemNo': '',
              'paymentMethod': 'Physical Check',
              'accountStatus': 'Active',
              'contactInfo': 'customerservice@alexanderstreet.com',
              'libraryCode': 'COB',
              'libraryEdiCode': '765987610',
              'notes': '',
              'acqUnitIds': []
            }
          ],
          'isVendor': true,
          'sanCode': '1234567',
          'changelogs': [
            {
              'description': 'This is a sample note.',
              'timestamp': '2008-05-15T10:53:00.000+00:00'
            }
          ],
          'acqUnitIds': [],
          'metadata': {
            'createdDate': '2022-03-01T02:51:45.110+00:00',
            'updatedDate': '2022-03-01T02:51:45.110+00:00'
          }
        }
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
      ],
      'interfaces': [
        {
          'id': '14e81009-0f98-45a0-b8e6-e25547beb22f',
          'name': 'Academic Video Online',
          'uri': 'https://search.alexanderstreet.com/avon',
          'available': false,
          'type': [],
          'metadata': {
            'createdDate': '2022-03-01T02:51:47.017+00:00',
            'updatedDate': '2022-03-01T02:51:47.017+00:00'
          }
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
      'name': 'alternatename1'
    },
    {
      'id': '499062e4-0e45-41e2-bde4-8cea07e3bd1c',
      'owner': {
        'id': '457fa9b8-da99-4aa0-9a9e-a03ed39053e3'
      },
      'name': 'alternatename2'
    }
  ],
  'linkedAgreements': []
};

let renderComponent;

describe('LicenseInfo', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <LicenseInfo
        id="licenseInfo"
        license={license}
      />,
      translationsProperties
    );
  });

  test('renders the license name', async () => {
    const { getByText } = renderComponent;
    expect(getByText('CM test license 1')).toBeInTheDocument();
  });

  test('renders the alternate names MCL', async () => {
    await MultiColumnList('alternate-names-list').exists();
  });

  test('renders expected alternate name in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'alternatename1' }),
      await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: 'alternatename2' })
    ]);
  });
});
