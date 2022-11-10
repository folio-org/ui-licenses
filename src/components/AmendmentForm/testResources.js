const data = {
  'license': {
    'id': '28887d49-0537-4a44-a4c6-b6702c9f4b00',
    'endDateSemantics': {
      'id': '2c91809d8202190d0182021f9b800012',
      'value': 'implicit',
      'label': 'Implicit',
      'owner': '{desc: "License.EndDateSemantics", id: "2c91809d820…}'
    },
    'dateCreated': '2022-07-15T18:45:05Z',
    'customProperties': {},
    'contacts': [],
    'tags': [],
    'lastUpdated': '2022-07-15T18:45:05Z',
    'docs': [],
    'name': 'MR Licenses',
    'status': {
      'id': '2c91809d8202190d0182021f9b9b0016',
      'value': 'active',
      'label': 'Active',
      'owner': '{desc: "License.Status", id: "2c91809d8202190d01820…}'
    },
    'supplementaryDocs': [],
    'startDate': '2022-07-08',
    'openEnded': false,
    'amendments': [],
    'orgs': [],
    'type': {
      'id': '2c91809d8202190d0182021f9b380007',
      'value': 'local',
      'label': 'Local',
      'owner': '{desc: "License.Type", id: "2c91809d8202190d0182021…}'
    },
    'alternateNames': []
  },
  'documentCategories': [{
    'id': '2c91809d8202190d0182021f9b5a000c',
    'value': 'consortium_authorization_statement',
    'label': 'Consortium authorization statement'
  },
  {
    'id': '2c91809d8202190d0182021f9b61000d',
    'value': 'product_data_sheet',
    'label': 'Product data sheet'
  },
  {
    'id': '2c91809d8202190d0182021f9b67000e',
    'value': 'vendor_terms_and_conditions',
    'label': 'Vendor terms and conditions'
  }
  ],
  'statusValues': [{
    'id': '2c91809d8202190d0182021f9b9b0016',
    'value': 'active',
    'label': 'Active'
  },
  {
    'id': '2c91809d8202190d0182021f9ba90018',
    'value': 'expired',
    'label': 'Expired'
  },
  {
    'id': '2c91809d8202190d0182021f9b8c0014',
    'value': 'in_negotiation',
    'label': 'In negotiation'
  },
  {
    'id': '2c91809d8202190d0182021f9b940015',
    'value': 'not_yet_active',
    'label': 'Not yet active'
  },
  {
    'id': '2c91809d8202190d0182021f9ba20017',
    'value': 'rejected',
    'label': 'Rejected'
  }
  ]
};

const handlers = {
  onClose: jest.fn(),
};

const initialValues = {
  'status': 'active',
  'openEnded': false,
  'customProperties': {
    'authorisedUsers': [
      '{_delete: true}'
    ],
    'remoteAccess': [
      '{_delete: true}'
    ],
    'illElectronic': [{
      '_delete': true
    }],
    'copyDigital': [
      '{_delete: true}'
    ],
    'copyPrint': [
      '{_delete: true}'
    ],
    'concurrentAccess': [
      '{_delete: true}'
    ],
    'illPrint': [
      '{_delete: true}'
    ],
    'illSecureElectronic': [
      '{_delete: true}'
    ],
    'reservesElectronic': [
      '{_delete: true}'
    ],
    'coursePackElectronic': [
      '{_delete: true}'
    ],
    'coursePackPrint': [
      '{_delete: true}'
    ],
    'walkInAccess': [
      '{_delete: true}'
    ]
  }
};

const isLoading = false;

export {
  data,
  handlers,
  initialValues,
  isLoading,
};
