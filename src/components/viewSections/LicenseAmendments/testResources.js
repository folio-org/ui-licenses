import { FormattedMessage } from 'react-intl';

const id = 'licenseAmendments';

const handlers = {
  onAmendmentClick : jest.fn(),
};

const urls = {
  'edit': () => {},
  'addAmendment': () => {},
  'viewAmendment': () => {},
};

const license = {
  'id': '71ee43f8-3860-4f20-b35d-2d6c786f576e',
  'endDateSemantics': {
    'id': '2c91809d83e658700183e65f6e6b000b',
    'value': 'implicit',
    'label': 'Implicit',
    'owner': {
      'id': '2c91809d83e658700183e65f6e5c0008',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-10-18T08:25:07Z',
  'customProperties': '{}',
  'contacts': '[]',
  'tags': '[]',
  'lastUpdated': '2022-10-18T12:18:00Z',
  'docs': '[]',
  'name': 'MR Test License',
  'status': {
    'id': '2c91809d83e658700183e65f6e7c000f',
    'value': 'active',
    'label': 'Active',
    'owner': {
      'id': '2c91809d83e658700183e65f6e6f000c',
      'desc': 'License.Status',
      'internal': true
    }
  },
  'supplementaryDocs': '[]',
  'description': 'test',
  'startDate': '2022-10-18',
  'openEnded': false,
  'amendments': [{
    'id': 'a0937ca0-89a0-4d88-9130-51d10150c1a4',
    'endDateSemantics': {
      'id': '2c91809d83e658700183e65f6e5e0009',
      'value': 'explicit',
      'label': 'Explicit',
      'owner': {
        'id': '2c91809d83e658700183e65f6e5c0008',
        'desc': 'License.EndDateSemantics',
        'internal': true
      }
    },
    'dateCreated': '2022-10-18T12:18:00Z',
    'customProperties': '{}',
    'contacts': '[]',
    'tags': '[]',
    'lastUpdated': '2022-10-18T12:18:00Z',
    'docs': '[]',
    'name': 'Amendment test 2',
    'status': {
      'id': '2c91809d83e658700183e65f6e7c000f',
      'value': 'active',
      'label': 'Active',
      'owner': {
        'id': '2c91809d83e658700183e65f6e6f000c',
        'desc': 'License.Status',
        'internal': true
      }
    },
    'supplementaryDocs': '[]',
    'description': 'testing amendments',
    'startDate': '2022-10-10',
    'endDate': '2022-10-25',
    'openEnded': false
  },
  {
    'id': 'bd046c7c-2631-4dfd-adef-69b69baa5d07',
    'endDateSemantics': {
      'id': '2c91809d83e658700183e65f6e5e0009',
      'value': 'explicit',
      'label': 'Explicit',
      'owner': {
        'id': '2c91809d83e658700183e65f6e5c0008',
        'desc': 'License.EndDateSemantics',
        'internal': true
      }
    },
    'dateCreated': '2022-10-18T08:59:14Z',
    'customProperties': '{}',
    'contacts': '[]',
    'tags': '[]',
    'lastUpdated': '2022-10-18T12:17:16Z',
    'docs': '[]',
    'name': 'Amendment test',
    'status': {
      'id': '2c91809d83e658700183e65f6e7c000f',
      'value': 'active',
      'label': 'Active',
      'owner': {
        'id': '2c91809d83e658700183e65f6e6f000c',
        'desc': 'License.Status',
        'internal': true
      }
    },
    'supplementaryDocs': '[]',
    'description': 'test',
    'startDate': '2022-10-01',
    'endDate': '2022-10-31',
    'openEnded': false
  }
  ],
  'orgs': '[]',
  'type': {
    'id': '2c91809d83e658700183e65f6ea30018',
    'value': 'consortial',
    'label': 'Consortial',
    'owner': {
      'id': '2c91809d83e658700183e65f6e9c0016',
      'desc': 'License.Type',
      'internal': false
    }
  },
  'alternateNames': '[]',
  'linkedAgreements': [{
    'id': '2c91809c83e657ed0183ea32bf6e0082',
    'remoteId': '71ee43f8-3860-4f20-b35d-2d6c786f576e',
    'owner': {
      'id': '4792fad8-a2d7-4a08-9516-3d519bcbfa2e',
      'dateCreated': '2022-10-18T08:24:36Z',
      'name': 'MR Test Agreement',
      'orgs': [],
      'externalLicenseDocs': [],
      'outwardRelationships': [],
      'customProperties': {},
      'contacts': [],
      'tags': [],
      'lastUpdated': '2022-10-18T08:25:37Z',
      'inwardRelationships': [],
      'endDate': '2022-10-31',
      'startDate': '2022-10-01',
      'docs': [],
      'periods': [
        '{endDate: "2022-10-31", id: "95800f9b-abd6-4faf-a23…}'
      ],
      'usageDataProviders': [],
      'agreementStatus': {
        'id': '2c91809c83e657ed0183e65f54510016',
        'value': 'active',
        'label': 'Active'
      },
      'supplementaryDocs': [],
      'description': 'This is a description of MR Test Agreement.',
      'cancellationDeadline': null,
      'alternateNames': [],
      'version': 1
    },
    'amendments': '[]',
    'status': {
      'id': '2c91809c83e657ed0183e65f54590018',
      'value': 'controlling',
      'label': 'Controlling'
    },
    'note': 'test'
  },
  {
    'id': '2c91809c83e657ed0183ea7d156b0083',
    'remoteId': '71ee43f8-3860-4f20-b35d-2d6c786f576e',
    'owner': '{agreementStatus: {…}, alternateNames: Array(0), ca…}',
    'amendments': [{
      'id': '1a356524-3a98-4e8b-bdff-82000fba49a6',
      'owner': {
        'id': '2c91809c83e657ed0183ea7d156b0083'
      },
      'status': {
        'id': '2c91809c83e657ed0183e65f53df0001',
        'value': 'current',
        'label': 'Current'
      },
      'amendmentId': 'bd046c7c-2631-4dfd-adef-69b69baa5d07',
      'note': 'test'
    }],
    'status': '{id: "2c91809c83e657ed0183e65f54590018", label: "Co…}',
    'note': 'test'
  }
  ]
};

const record = {
  'id': '71ee43f8-3860-4f20-b35d-2d6c786f576e',
  'endDateSemantics': {
    'id': '2c91809d83e658700183e65f6e6b000b',
    'value': 'implicit',
    'label': 'Implicit',
    'owner': {
      'id': '2c91809d83e658700183e65f6e5c0008',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-10-18T08:25:07Z',
  'customProperties': '{}',
  'contacts': '[]',
  'tags': '[]',
  'lastUpdated': '2022-10-18T12:18:00Z',
  'docs': '[]',
  'name': 'MR Test License',
  'status': {
    'id': '2c91809d83e658700183e65f6e7c000f',
    'value': 'active',
    'label': 'Active',
    'owner': {
      'id': '2c91809d83e658700183e65f6e6f000c',
      'desc': 'License.Status',
      'internal': true
    }
  },
  'supplementaryDocs': '[]',
  'description': 'test',
  'startDate': '2022-10-18',
  'openEnded': false,
  'amendments': [{
    'id': 'a0937ca0-89a0-4d88-9130-51d10150c1a4',
    'endDateSemantics': {
      'id': '2c91809d83e658700183e65f6e5e0009',
      'value': 'explicit',
      'label': 'Explicit',
      'owner': {
        'id': '2c91809d83e658700183e65f6e5c0008',
        'desc': 'License.EndDateSemantics',
        'internal': true
      }
    },
    'dateCreated': '2022-10-18T12:18:00Z',
    'customProperties': '{}',
    'contacts': '[]',
    'tags': '[]',
    'lastUpdated': '2022-10-18T12:18:00Z',
    'docs': '[]',
    'name': 'Amendment test 2',
    'status': {
      'id': '2c91809d83e658700183e65f6e7c000f',
      'value': 'active',
      'label': 'Active',
      'owner': {
        'id': '2c91809d83e658700183e65f6e6f000c',
        'desc': 'License.Status',
        'internal': true
      }
    },
    'supplementaryDocs': '[]',
    'description': 'testing amendments',
    'startDate': '2022-10-10',
    'endDate': '2022-10-25',
    'openEnded': false
  },
  {
    'id': 'bd046c7c-2631-4dfd-adef-69b69baa5d07',
    'endDateSemantics': {
      'id': '2c91809d83e658700183e65f6e5e0009',
      'value': 'explicit',
      'label': 'Explicit',
      'owner': {
        'id': '2c91809d83e658700183e65f6e5c0008',
        'desc': 'License.EndDateSemantics',
        'internal': true
      }
    },
    'dateCreated': '2022-10-18T08:59:14Z',
    'customProperties': '{}',
    'contacts': '[]',
    'tags': '[]',
    'lastUpdated': '2022-10-18T12:17:16Z',
    'docs': '[]',
    'name': 'Amendment test',
    'status': {
      'id': '2c91809d83e658700183e65f6e7c000f',
      'value': 'active',
      'label': 'Active',
      'owner': {
        'id': '2c91809d83e658700183e65f6e6f000c',
        'desc': 'License.Status',
        'internal': true
      }
    },
    'supplementaryDocs': '[]',
    'description': 'test',
    'startDate': '2022-10-01',
    'endDate': '2022-10-31',
    'openEnded': false
  }
  ],
  'orgs': '[]',
  'type': {
    'id': '2c91809d83e658700183e65f6ea30018',
    'value': 'consortial',
    'label': 'Consortial',
    'owner': {
      'id': '2c91809d83e658700183e65f6e9c0016',
      'desc': 'License.Type',
      'internal': false
    }
  },
  'alternateNames': '[]',
  'linkedAgreements': [{
    'id': '2c91809c83e657ed0183ea32bf6e0082',
    'remoteId': '71ee43f8-3860-4f20-b35d-2d6c786f576e',
    'owner': {
      'id': '4792fad8-a2d7-4a08-9516-3d519bcbfa2e',
      'dateCreated': '2022-10-18T08:24:36Z',
      'name': 'MR Test Agreement',
      'orgs': [],
      'externalLicenseDocs': [],
      'outwardRelationships': [],
      'customProperties': {},
      'contacts': [],
      'tags': [],
      'lastUpdated': '2022-10-18T08:25:37Z',
      'inwardRelationships': [],
      'endDate': '2022-10-31',
      'startDate': '2022-10-01',
      'docs': [],
      'periods': [
        '{endDate: "2022-10-31", id: "95800f9b-abd6-4faf-a23…}'
      ],
      'usageDataProviders': [],
      'agreementStatus': {
        'id': '2c91809c83e657ed0183e65f54510016',
        'value': 'active',
        'label': 'Active'
      },
      'supplementaryDocs': [],
      'description': 'This is a description of MR Test Agreement.',
      'cancellationDeadline': null,
      'alternateNames': [],
      'version': 1
    },
    'amendments': '[]',
    'status': {
      'id': '2c91809c83e657ed0183e65f54590018',
      'value': 'controlling',
      'label': 'Controlling'
    },
    'note': 'test'
  },
  {
    'id': '2c91809c83e657ed0183ea7d156b0083',
    'remoteId': '71ee43f8-3860-4f20-b35d-2d6c786f576e',
    'owner': '{agreementStatus: {…}, alternateNames: Array(0), ca…}',
    'amendments': [{
      'id': '1a356524-3a98-4e8b-bdff-82000fba49a6',
      'owner': '{id: "2c91809c83e657ed0183ea7d156b0083"}',
      'status': {
        'id': '2c91809c83e657ed0183e65f53df0001',
        'value': 'current',
        'label': 'Current'
      },
      'amendmentId': 'bd046c7c-2631-4dfd-adef-69b69baa5d07',
      'note': 'test'
    }],
    'status': '{id: "2c91809c83e657ed0183e65f54590018", label: "Co…}',
    'note': 'test'
  }
  ]
};

const recordType = 'license';
const licenseAmendmentsAccordionLabel = <FormattedMessage id="ui-licenses.section.amendments" />;

export {
  licenseAmendmentsAccordionLabel,
  record,
  recordType,
  id,
  urls,
  handlers,
  license
};
