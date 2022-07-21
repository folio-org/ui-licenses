const data = {
  'license': {
    'id': '760de5b6-7252-4611-ad98-28f445b699c6',
    'endDateSemantics': {
      'id': '2c91809d821947fa0182194e9c8f0010',
      'value': 'explicit',
      'label': 'Explicit',
      'owner': '{desc: "License.EndDateSemantics", id: "2c91809d821…}'
    },
    'dateCreated': '2022-07-20T13:15:13Z',
    'customProperties': {
      'authorisedUsers': '[{…}]'
    },
    'contacts': [{
      'id': '2c91809d821947fa01821bc95ff50047',
      'owner': {
        'id': '760de5b6-7252-4611-ad98-28f445b699c6'
      },
      'role': {
        'id': '2c91809d821947fa0182194e9c340002',
        'value': 'erm_librarian',
        'label': 'ERM Librarian',
        'owner': '{desc: "InternalContact.Role", id: "2c91809d821947f…}'
      },
      'user': {
        'username': 'diku',
        'id': '1968f956-7b82-5621-92b2-03efce0207ad',
        'active': true,
        'departments': '[]',
        'proxyFor': '[]',
        'personal': '{addresses: Array(0), firstName: "EDGE", lastName: …}',
        'createdDate': '2022-07-20T02:00:12.530+00:00',
        'updatedDate': '2022-07-20T02:00:12.530+00:00',
        'metadata': '{createdByUserId: "5c58d612-528a-520c-8b61-9ff789a0…}'
      }
    }],
    'tags': [],
    'lastUpdated': '2022-07-20T13:25:58Z',
    'docs': [],
    'name': 'MR License',
    'status': {
      'id': '2c91809d821947fa0182194e9cb80016',
      'value': 'active',
      'label': 'Active',
      'owner': '{desc: "License.Status", id: "2c91809d821947fa01821…}'
    },
    'supplementaryDocs': [{
      'id': '2b854f9a-139a-40f7-b582-ff6338eccd98',
      'dateCreated': '2022-07-20T13:25:58Z',
      'lastUpdated': '2022-07-20T13:25:58Z',
      'fileUpload': {
        'id': '96f8d5e3-1819-46eb-98bf-533e1d1624cb',
        'contentType': 'image/png',
        'size': 8964,
        'modified': '2022-07-20T13:25:58Z',
        'name': 'ActionMenu.png'
      },
      'name': 'Test'
    }],
    'description': 'This is description for MR License.',
    'startDate': '2022-07-01',
    'endDate': '2022-07-31',
    'openEnded': false,
    'amendments': [],
    'orgs': [{
      'id': '162fd1da-9dfe-4ae7-973e-1a9f339f2958',
      'primaryOrg': false,
      'org': {
        'id': '23ce8c64-a35e-480d-b395-672400ddc118',
        'orgsUuid': 'e0fb5df2-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Amazon.com',
        'orgsUuid_object': '{accessProvider: false, accounts: Array(1), acqUnit…}'
      },
      'owner': {
        'id': '760de5b6-7252-4611-ad98-28f445b699c6'
      },
      'roles': [
        '{id: "ab327017-4c4d-407b-b71e-f47522f28bda", owner:…}'
      ],
      'interfaces': [{
        'id': 'cd592659-77aa-4eb3-ac34-c9a4657bb20f',
        'name': 'Amazon',
        'uri': 'www.amazon.com',
        'available': false,
        'type': [
          'Orders'
        ],
        'metadata': {
          'createdDate': '2022-07-20T01:52:03.402+00:00',
          'updatedDate': '2022-07-20T01:52:03.402+00:00'
        }
      }]
    }],
    'type': {
      'id': '2c91809d821947fa0182194e9c6b000b',
      'value': 'local',
      'label': 'Local',
      'owner': '{desc: "License.Type", id: "2c91809d821947fa0182194…}'
    },
    'alternateNames': [{
      'id': '4826ae64-bde7-4f13-8bcd-13678e3f3197',
      'owner': {
        'id': '760de5b6-7252-4611-ad98-28f445b699c6'
      },
      'name': 'Test License'
    }],
    'linkedAgreements': []
  },
  'tagsLink': 'licenses/licenses/760de5b6-7252-4611-ad98-28f445b699c6'
};

const isLoading = false;

const urls = {
  'edit': () => {},
  'addAmendment': () => {},
  'viewAmendment': () => {},
};

const handlers = {
  onClone: jest.fn(),
  onClose: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  onFetchCredentials: jest.fn(),
  onAmendmentClick: jest.fn(),
  onToggleTags: jest.fn()
};
export {
  data,
  isLoading,
  handlers,
  urls
};
