const data = {
  'licenses': [{
    'id': 'b090e42c-8263-471a-8bea-85c5f513fb51',
    'endDateSemantics': {
      'id': '2c91809d823598a00182359f2ef70014',
      'value': 'implicit',
      'label': 'Implicit',
      'owner': {
        'id': '2c91809d823598a00182359f2ee60011',
        'desc': 'License.EndDateSemantics',
        'internal': true
      }
    },
    'dateCreated': '2022-07-25T15:13:35Z',
    'customProperties': {},
    'contacts': [],
    'tags': [],
    'lastUpdated': '2022-07-25T15:13:35Z',
    'docs': [],
    'name': 'MR Licenses',
    'status': {
      'id': '2c91809d823598a00182359f2f0d0018',
      'value': 'active',
      'label': 'Active',
      'owner': {
        'id': '2c91809d823598a00182359f2efd0015',
        'desc': 'License.Status',
        'internal': true
      }
    },
    'supplementaryDocs': [],
    'startDate': '2022-07-06',
    'openEnded': false,
    'amendments': [],
    'orgs': [],
    'type': {
      'id': '2c91809d823598a00182359f2ec8000d',
      'value': 'local',
      'label': 'Local',
      'owner': {
        'id': '2c91809d823598a00182359f2ec3000c',
        'desc': 'License.Type',
        'internal': false
      }
    },
    'alternateNames': []
  }],
  'statusValues': [{
    'id': '2c91809d823598a00182359f2f0d0018',
    'value': 'active',
    'label': 'Active'
  },
  {
    'id': '2c91809d823598a00182359f2f1a001a',
    'value': 'expired',
    'label': 'Expired'
  },
  {
    'id': '2c91809d823598a00182359f2f000016',
    'value': 'in_negotiation',
    'label': 'In negotiation'
  },
  {
    'id': '2c91809d823598a00182359f2f060017',
    'value': 'not_yet_active',
    'label': 'Not yet active'
  },
  {
    'id': '2c91809d823598a00182359f2f130019',
    'value': 'rejected',
    'label': 'Rejected'
  }
  ],
  'typeValues': [{
    'id': '2c91809d823598a00182359f2ee10010',
    'value': 'alliance',
    'label': 'Alliance'
  },
  {
    'id': '2c91809d823598a00182359f2ed0000e',
    'value': 'consortial',
    'label': 'Consortial'
  },
  {
    'id': '2c91809d823598a00182359f2ec8000d',
    'value': 'local',
    'label': 'Local'
  },
  {
    'id': '2c91809d823598a00182359f2ed8000f',
    'value': 'national',
    'label': 'National'
  }
  ],
  'orgRoleValues': [{
    'id': '2c91809d823598a00182359f2ebc000b',
    'value': 'licensor',
    'label': 'Licensor'
  }],
  'tags': [{
    'id': '590c2a8f-353e-42b5-b35c-cb974967c478',
    'label': 'important',
    'metadata': '{createdDate: "2022-07-25T13:49:42.538+00:00"}'
  },
  {
    'id': 'e6d3f6c1-5478-4c75-a0fe-e316cb737220',
    'label': 'urgent',
    'description': 'Requires urgent attention',
    'metadata': '{createdDate: "2022-07-25T13:49:42.544+00:00"}'
  }
  ]
};

const history = {
  'length': 19,
  'action': 'PUSH',
  'location': {
    'pathname': '/licenses/b090e42c-8263-471a-8bea-85c5f513fb51',
    'search': '?filters=status.active&sort=status%2Ctype',
    'hash': '',
    'key': 'ltd0af'
  },
  'createHref': 'ƒ createHref() {}',
  'push': 'ƒ push() {}',
  'replace': 'ƒ replace() {}',
  'go': 'ƒ go() {}',
  'goBack': 'ƒ goBack() {}',
  'goForward': 'ƒ goForward() {}',
  'block': 'ƒ block() {}',
  'listen': 'ƒ listen() {}'
};

const onCompareLicenseTerms = jest.fn();
const onNeedMoreData = jest.fn();
const queryGetter = jest.fn();
const querySetter = jest.fn();
const searchString = '?filters=status.active&sort=name';
const selectedRecordId = 'fb73b09e-eaa3-4c33-a13b-d0de0d787ce8';

const source = {
  totalCount: jest.fn(),
  loaded: jest.fn(),
  pending: jest.fn(),
  failure: jest.fn(),
  failureMessage: jest.fn(),
};

const children = '<Switch />';

export {
  children,
  data,
  history,
  onCompareLicenseTerms,
  onNeedMoreData,
  queryGetter,
  querySetter,
  searchString,
  selectedRecordId,
  source
};
