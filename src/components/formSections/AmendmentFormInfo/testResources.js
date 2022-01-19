const data = {
  'license': {
    'id': 'f4735619-0914-445e-bc32-e66d38bbed99',
    'endDateSemantics': {
      'id': '2c91809d7e65b542017e65bc295a0001',
      'value': 'explicit',
      'label': 'Explicit',
      'owner': '{desc: "License.EndDateSemantics", id: "2c91809d7e6…}'
    },
    'dateCreated': '2022-01-17T12:53:32Z',
    'customProperties': {},
    'contacts': [],
    'tags': [],
    'lastUpdated': '2022-01-17T12:54:30Z',
    'docs': [],
    'name': 'MR License',
    'status': {
      'id': '2c91809d7e65b542017e65bc29860007',
      'value': 'active',
      'label': 'Active',
      'owner': '{desc: "License.Status", id: "2c91809d7e65b542017e6…}'
    },
    'supplementaryDocs': [],
    'startDate': '2022-01-02',
    'endDate': '2022-01-30',
    'openEnded': false,
    'amendments': [{
      'id': '4cbdb9ba-acdc-42eb-b25f-37804e4aea52',
      'endDateSemantics': {
        'id': '2c91809d7e65b542017e65bc295a0001',
        'value': 'explicit',
        'label': 'Explicit',
        'owner': {
          'id': '2c91809d7e65b542017e65bc28ff0000',
          'desc': 'License.EndDateSemantics',
          'internal': true
        }
      },
      'dateCreated': '2022-01-17T12:54:30Z',
      'customProperties': {},
      'contacts': [],
      'tags': [],
      'lastUpdated': '2022-01-17T12:54:30Z',
      'docs': [],
      'name': 'Amendment Test',
      'status': {
        'id': '2c91809d7e65b542017e65bc29860007',
        'value': 'active',
        'label': 'Active',
        'owner': {
          'id': '2c91809d7e65b542017e65bc29730004',
          'desc': 'License.Status',
          'internal': true
        }
      },
      'supplementaryDocs': [],
      'description': 'Amendment description',
      'startDate': '2022-01-02',
      'endDate': '2022-01-20',
      'openEnded': false
    }],
    'orgs': [],
    'type': {
      'id': '2c91809d7e65b542017e65bc29c20011',
      'value': 'local',
      'label': 'Local',
      'owner': '{desc: "License.Type", id: "2c91809d7e65b542017e65b…}'
    },
    'alternateNames': []
  },
  'documentCategories': [{
      'id': '2c91809d7e65b542017e65bc29a8000d',
      'value': 'consortium_authorization_statement',
      'label': 'Consortium authorization statement',
      'owner': {
        'id': '2c91809d7e65b542017e65bc29a4000c',
        'desc': 'DocumentAttachment.AtType',
        'internal': false
      }
    },
    {
      'id': '2c91809d7e65b542017e65bc29af000e',
      'value': 'product_data_sheet',
      'label': 'Product data sheet',
      'owner': {
        'id': '2c91809d7e65b542017e65bc29a4000c',
        'desc': 'DocumentAttachment.AtType',
        'internal': false
      }
    },
    {
      'id': '2c91809d7e65b542017e65bc29b7000f',
      'value': 'vendor_terms_and_conditions',
      'label': 'Vendor terms and conditions',
      'owner': {
        'id': '2c91809d7e65b542017e65bc29a4000c',
        'desc': 'DocumentAttachment.AtType',
        'internal': false
      }
    }
  ],
  'statusValues': [{
      'id': '2c91809d7e65b542017e65bc29780005',
      'value': 'in_negotiation',
      'label': 'In negotiation',
      'owner': {
        'id': '2c91809d7e65b542017e65bc29730004',
        'desc': 'License.Status',
        'internal': true
      }
    },
    {
      'id': '2c91809d7e65b542017e65bc297f0006',
      'value': 'not_yet_active',
      'label': 'Not yet active',
      'owner': {
        'id': '2c91809d7e65b542017e65bc29730004',
        'desc': 'License.Status',
        'internal': true
      }
    },
    {
      'id': '2c91809d7e65b542017e65bc29860007',
      'value': 'active',
      'label': 'Active',
      'owner': {
        'id': '2c91809d7e65b542017e65bc29730004',
        'desc': 'License.Status',
        'internal': true
      }
    },
    {
      'id': '2c91809d7e65b542017e65bc298d0008',
      'value': 'rejected',
      'label': 'Rejected',
      'owner': {
        'id': '2c91809d7e65b542017e65bc29730004',
        'desc': 'License.Status',
        'internal': true
      }
    },
    {
      'id': '2c91809d7e65b542017e65bc29940009',
      'value': 'expired',
      'label': 'Expired',
      'owner': {
        'id': '2c91809d7e65b542017e65bc29730004',
        'desc': 'License.Status',
        'internal': true
      }
    }
  ],
  'terms': [{
      'id': '2c91809d7e65b542017e65bc2c0e0028',
      'name': 'authorisedUsers',
      'primary': true,
      'defaultInternal': true,
      'label': 'Definition of authorised user',
      'description': 'The definition of an authorised user for a resource',
      'weight': -1,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '2c91809d7e65b542017e65bc2cf9002a',
      'name': 'remoteAccess',
      'primary': true,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e65b542017e65b…}',
      'defaultInternal': true,
      'label': 'Access restricted to on-campus/campus network?',
      'description': 'Can access to the resource be provided from outside the library or institutional location / network',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2cfe002b',
      'name': 'illElectronic',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': true,
      'label': 'Electronic ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of electronic copies',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d250031',
      'name': 'copyDigital',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': true,
      'label': 'Making digital copies',
      'description': 'The right of the licensee and authorized users to download and digitally copy a reasonable portion of the licensed materials',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d2a0032',
      'name': 'copyPrint',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': true,
      'label': 'Making print copies',
      'description': 'The right of the licensee and authorized users to print a reasonable portion of the licensed materials',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2c040027',
      'name': 'concurrentAccess',
      'primary': true,
      'defaultInternal': true,
      'label': 'Number of concurrent users allowed',
      'description': 'The number of concurrent users allowed by the resource',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d0d002d',
      'name': 'illPrint',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': true,
      'label': 'Print ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of print copies or facsimile transmission',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d05002c',
      'name': 'illSecureElectronic',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': true,
      'label': 'Secure Electronic ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of secure electronic transmission',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d13002e',
      'name': 'reservesElectronic',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': true,
      'label': 'Storage of electronic copies on secure network',
      'description': 'The right to make electronic copies of the licensed materials and store them on a secure network',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d1a002f',
      'name': 'coursePackElectronic',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': false,
      'label': 'Use in electronic coursepacks',
      'description': 'The right to use licensed materials in collections or compilations of materials assembled in an electronic format by faculty members for use by students in a class for purposes of instruction',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d200030',
      'name': 'coursePackPrint',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': false,
      'label': 'Use in print course packs',
      'description': 'The right to use licensed materials in collections or compilations of materials assembled in a print format by faculty members for use by students in a class for purposes of instruction',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2cf30029',
      'name': 'walkInAccess',
      'primary': true,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e65b542017e65b…}',
      'defaultInternal': false,
      'label': 'Walk-in access permitted?',
      'description': 'Can non-members of the library/instittuion use the resource when in the library',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d460038',
      'name': 'authProxy',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e65b542017e65b…}',
      'defaultInternal': true,
      'label': 'Access via a proxy supported?',
      'description': 'Whether authentication via a reverse proxy is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d54003b',
      'name': 'annualOptOut',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e65b542017e65b…}',
      'defaultInternal': true,
      'label': 'Annual opt-out clause included?',
      'description': "Whether the license includes an 'annual opt-out' clause within a multi-year agreement",
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d410037',
      'name': 'authIP',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e65b542017e65b…}',
      'defaultInternal': true,
      'label': 'IP authentication supported?',
      'description': 'Whether authentication via IP range is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d3c0036',
      'name': 'metadataUsage',
      'primary': false,
      'defaultInternal': true,
      'label': 'Metadata usage',
      'description': 'Any restrictions expressed related to the use of metadata in the platforms',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d320034',
      'name': 'otherRestrictions',
      'primary': false,
      'defaultInternal': true,
      'label': 'Other restrictions',
      'description': 'Other restrictions expressed in the license',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d4f003a',
      'name': 'authSAML',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e65b542017e65b…}',
      'defaultInternal': true,
      'label': 'SAML compliant authentication supported?',
      'description': 'Whether authentication via SAML compliant method is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d2e0033',
      'name': 'scholarlySharing',
      'primary': false,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': true,
      'label': 'Sharing for scholarly use',
      'description': 'The right of authorized users and/or licensee to transmit hard copy or electronic copy of reasonable amounts of licensed materials to a third party for personal, scholarly, educational, scientific or professional use',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d370035',
      'name': 'textAndDataMining',
      'primary': false,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e65b54…}',
      'defaultInternal': false,
      'label': 'Text and Data mining',
      'description': 'Whether it is permitted to use text and data mining processes on the content of the resource',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d57003c',
      'name': 'APCAndOffsetting',
      'primary': false,
      'defaultInternal': true,
      'label': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
      'description': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '2c91809d7e65b542017e65bc2d4a0039',
      'name': 'postCancellationAccess',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e65b542017e65b…}',
      'defaultInternal': true,
      'label': 'Post-cancellation terms included?',
      'description': 'Does the license include post-cancellation terms?',
      'weight': 1,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    }
  ]
};

const handlers = {
  'onDownloadFile': 'ƒ () {}',
  'onUploadFile': 'ƒ () {}',
  'onClose': 'ƒ () {}'
};

const mutators = {
  'setFieldData': 'ƒ () {}',
  'insert': 'ƒ () {}',
  'concat': 'ƒ () {}',
  'move': 'ƒ () {}',
  'pop': 'ƒ () {}',
  'push': 'ƒ () {}',
  'remove': 'ƒ () {}',
  'removeBatch': 'ƒ () {}',
  'shift': 'ƒ () {}',
  'swap': 'ƒ () {}',
  'unshift': 'ƒ () {}',
  'update': 'ƒ () {}'
};

const values = {
  'id': '4cbdb9ba-acdc-42eb-b25f-37804e4aea52',
  'endDateSemantics': {
    'id': '2c91809d7e65b542017e65bc295a0001',
    'value': 'explicit',
    'label': 'Explicit',
    'owner': {
      'id': '2c91809d7e65b542017e65bc28ff0000',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-01-17T12:54:30Z',
  'customProperties': {
    'authorisedUsers': [{
      '_delete': true
    }],
    'remoteAccess': [{
      '_delete': true
    }],
    'illElectronic': [{
      '_delete': true
    }],
    'copyDigital': [{
      '_delete': true
    }],
    'copyPrint': [{
      '_delete': true
    }],
    'concurrentAccess': [{
      '_delete': true
    }],
    'illPrint': [{
      '_delete': true
    }],
    'illSecureElectronic': [{
      '_delete': true
    }],
    'reservesElectronic': [{
      '_delete': true
    }],
    'coursePackElectronic': [{
      '_delete': true
    }],
    'coursePackPrint': [{
      '_delete': true
    }],
    'walkInAccess': [{
      '_delete': true
    }]
  },
  'contacts': '[]',
  'tags': '[]',
  'lastUpdated': '2022-01-17T12:54:30Z',
  'docs': '[]',
  'name': 'Amendment Test',
  'status': 'active',
  'supplementaryDocs': '[]',
  'description': 'Amendment description',
  'startDate': '2022-01-02',
  'endDate': '2022-01-20',
  'openEnded': false
};

const initialValues = {
  'id': '4cbdb9ba-acdc-42eb-b25f-37804e4aea52',
  'endDateSemantics': {
    'id': '2c91809d7e65b542017e65bc29650002',
    'value': 'open_ended',
    'label': 'Open ended',
    'owner': {
      'id': '2c91809d7e65b542017e65bc28ff0000',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-01-17T12:54:30Z',
  'customProperties': {
    'authorisedUsers': [
      '{_delete: true}'
    ],
    'remoteAccess': [
      '{_delete: true}'
    ],
    'illElectronic': [
      '{_delete: true}'
    ],
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
  },
  'contacts': '[]',
  'tags': '[]',
  'lastUpdated': '2022-01-17T14:43:10Z',
  'docs': '[]',
  'name': 'Amendment Test',
  'status': 'active',
  'supplementaryDocs': '[]',
  'description': 'Amendment description',
  'startDate': '2022-01-02',
  'endDate': '2022-01-20',
  'openEnded': true

};

export {
  data,
  handlers,
  mutators,
  values,
  initialValues
};
