const data = {
  'contactRoleValues': [{
      'id': '2c91809d7e7001a5017e70085ddd0003',
      'value': 'authorised_signatory',
      'label': 'Authorised signatory',
      'owner': '{desc: "InternalContact.Role", id: "2c91809d7e7001a…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085de60004',
      'value': 'erm_librarian',
      'label': 'ERM Librarian',
      'owner': '{desc: "InternalContact.Role", id: "2c91809d7e7001a…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085ded0005',
      'value': 'license_owner',
      'label': 'License owner',
      'owner': '{desc: "InternalContact.Role", id: "2c91809d7e7001a…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085df20006',
      'value': 'negotiator',
      'label': 'Negotiator',
      'owner': '{desc: "InternalContact.Role", id: "2c91809d7e7001a…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085df80007',
      'value': 'subject_specialist',
      'label': 'Subject specialist',
      'owner': '{desc: "InternalContact.Role", id: "2c91809d7e7001a…}'
    }
  ],
  'documentCategories': [{
      'id': '2c91809d7e7001a5017e70085e000009',
      'value': 'consortium_authorization_statement',
      'label': 'Consortium authorization statement',
      'owner': '{desc: "DocumentAttachment.AtType", id: "2c91809d7e…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e07000a',
      'value': 'product_data_sheet',
      'label': 'Product data sheet',
      'owner': '{desc: "DocumentAttachment.AtType", id: "2c91809d7e…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e0e000b',
      'value': 'vendor_terms_and_conditions',
      'label': 'Vendor terms and conditions',
      'owner': '{desc: "DocumentAttachment.AtType", id: "2c91809d7e…}'
    }
  ],
  'orgRoleValues': [{
    'id': '2c91809d7e7001a5017e70085dd20001',
    'value': 'licensor',
    'label': 'Licensor',
    'owner': '{desc: "LicenseOrg.Role", id: "2c91809d7e7001a5017e…}'
  }],
  'statusValues': [{
      'id': '2c91809d7e7001a5017e70085e480016',
      'value': 'in_negotiation',
      'label': 'In negotiation',
      'owner': '{desc: "License.Status", id: "2c91809d7e7001a5017e7…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e4e0017',
      'value': 'not_yet_active',
      'label': 'Not yet active',
      'owner': '{desc: "License.Status", id: "2c91809d7e7001a5017e7…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e540018',
      'value': 'active',
      'label': 'Active',
      'owner': '{desc: "License.Status", id: "2c91809d7e7001a5017e7…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e5a0019',
      'value': 'rejected',
      'label': 'Rejected',
      'owner': '{desc: "License.Status", id: "2c91809d7e7001a5017e7…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e60001a',
      'value': 'expired',
      'label': 'Expired',
      'owner': '{desc: "License.Status", id: "2c91809d7e7001a5017e7…}'
    }
  ],
  'terms': [{
      'id': '2c91809d7e7001a5017e7008608a0028',
      'name': 'authorisedUsers',
      'primary': true,
      'defaultInternal': true,
      'label': 'Definition of authorised user',
      'description': 'The definition of an authorised user for a resource',
      'weight': -1,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '2c91809d7e7001a5017e70086255002a',
      'name': 'remoteAccess',
      'primary': true,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e7001a5017e700…}',
      'defaultInternal': true,
      'label': 'Access restricted to on-campus/campus network?',
      'description': 'Can access to the resource be provided from outside the library or institutional location / network',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e70086258002b',
      'name': 'illElectronic',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': true,
      'label': 'Electronic ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of electronic copies',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e700862780031',
      'name': 'copyDigital',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': true,
      'label': 'Making digital copies',
      'description': 'The right of the licensee and authorized users to download and digitally copy a reasonable portion of the licensed materials',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e7008627c0032',
      'name': 'copyPrint',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': true,
      'label': 'Making print copies',
      'description': 'The right of the licensee and authorized users to print a reasonable portion of the licensed materials',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e7008607f0027',
      'name': 'concurrentAccess',
      'primary': true,
      'defaultInternal': true,
      'label': 'Number of concurrent users allowed',
      'description': 'The number of concurrent users allowed by the resource',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
    },
    {
      'id': '2c91809d7e7001a5017e70086264002d',
      'name': 'illPrint',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': true,
      'label': 'Print ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of print copies or facsimile transmission',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e7008625d002c',
      'name': 'illSecureElectronic',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': true,
      'label': 'Secure Electronic ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of secure electronic transmission',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e70086269002e',
      'name': 'reservesElectronic',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': true,
      'label': 'Storage of electronic copies on secure network',
      'description': 'The right to make electronic copies of the licensed materials and store them on a secure network',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e7008626f002f',
      'name': 'coursePackElectronic',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': false,
      'label': 'Use in electronic coursepacks',
      'description': 'The right to use licensed materials in collections or compilations of materials assembled in an electronic format by faculty members for use by students in a class for purposes of instruction',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e700862740030',
      'name': 'coursePackPrint',
      'primary': true,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': false,
      'label': 'Use in print course packs',
      'description': 'The right to use licensed materials in collections or compilations of materials assembled in a print format by faculty members for use by students in a class for purposes of instruction',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e700862500029',
      'name': 'walkInAccess',
      'primary': true,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e7001a5017e700…}',
      'defaultInternal': false,
      'label': 'Walk-in access permitted?',
      'description': 'Can non-members of the library/instittuion use the resource when in the library',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e700862930038',
      'name': 'authProxy',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e7001a5017e700…}',
      'defaultInternal': true,
      'label': 'Access via a proxy supported?',
      'description': 'Whether authentication via a reverse proxy is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e7008629e003b',
      'name': 'annualOptOut',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e7001a5017e700…}',
      'defaultInternal': true,
      'label': 'Annual opt-out clause included?',
      'description': "Whether the license includes an 'annual opt-out' clause within a multi-year agreement",
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e7008628f0037',
      'name': 'authIP',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e7001a5017e700…}',
      'defaultInternal': true,
      'label': 'IP authentication supported?',
      'description': 'Whether authentication via IP range is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e7008628b0036',
      'name': 'metadataUsage',
      'primary': false,
      'defaultInternal': true,
      'label': 'Metadata usage',
      'description': 'Any restrictions expressed related to the use of metadata in the platforms',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '2c91809d7e7001a5017e700862820034',
      'name': 'otherRestrictions',
      'primary': false,
      'defaultInternal': true,
      'label': 'Other restrictions',
      'description': 'Other restrictions expressed in the license',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '2c91809d7e7001a5017e7008629a003a',
      'name': 'authSAML',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e7001a5017e700…}',
      'defaultInternal': true,
      'label': 'SAML compliant authentication supported?',
      'description': 'Whether authentication via SAML compliant method is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e7008627f0033',
      'name': 'scholarlySharing',
      'primary': false,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': true,
      'label': 'Sharing for scholarly use',
      'description': 'The right of authorized users and/or licensee to transmit hard copy or electronic copy of reasonable amounts of licensed materials to a third party for personal, scholarly, educational, scientific or professional use',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e700862870035',
      'name': 'textAndDataMining',
      'primary': false,
      'category': '{desc: "Permitted/Prohibited", id: "2c91809d7e7001a…}',
      'defaultInternal': false,
      'label': 'Text and Data mining',
      'description': 'Whether it is permitted to use text and data mining processes on the content of the resource',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '2c91809d7e7001a5017e700862a0003c',
      'name': 'APCAndOffsetting',
      'primary': false,
      'defaultInternal': true,
      'label': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
      'description': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '2c91809d7e7001a5017e700862960039',
      'name': 'postCancellationAccess',
      'primary': false,
      'category': '{desc: "Yes/No/Other", id: "2c91809d7e7001a5017e700…}',
      'defaultInternal': true,
      'label': 'Post-cancellation terms included?',
      'description': 'Does the license include post-cancellation terms?',
      'weight': 1,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    }
  ],
  'typeValues': [{
      'id': '2c91809d7e7001a5017e70085e17000d',
      'value': 'local',
      'label': 'Local',
      'owner': '{desc: "License.Type", id: "2c91809d7e7001a5017e700…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e1c000e',
      'value': 'consortial',
      'label': 'Consortial',
      'owner': '{desc: "License.Type", id: "2c91809d7e7001a5017e700…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e22000f',
      'value': 'national',
      'label': 'National',
      'owner': '{desc: "License.Type", id: "2c91809d7e7001a5017e700…}'
    },
    {
      'id': '2c91809d7e7001a5017e70085e280010',
      'value': 'alliance',
      'label': 'Alliance',
      'owner': '{desc: "License.Type", id: "2c91809d7e7001a5017e700…}'
    }
  ],
  'users': [{
    'username': 'data-import',
    'id': 'ca4e1156-0629-4f1e-a8c2-e22176b8d02a',
    'barcode': '1642557651419724135',
    'active': true,
    'type': 'patron',
    'patronGroup': '3684a786-6671-4268-8ed0-9db82ebca60b',
    'departments': '[]',
    'proxyFor': '[]',
    'personal': {
      'lastName': 'Admin',
      'firstName': 'data-import',
      'addresses': []
    },
    'createdDate': '2022-01-19T02:00:51.423+00:00',
    'updatedDate': '2022-01-19T02:00:51.423+00:00',
    'metadata': {
      'createdDate': '2022-01-19T02:00:51.421+00:00',
      'createdByUserId': 'dfcdc5cc-d872-5019-8cff-bc5c5999d903',
      'updatedDate': '2022-01-19T02:00:51.421+00:00',
      'updatedByUserId': 'dfcdc5cc-d872-5019-8cff-bc5c5999d903'
    }
  }]
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
  'id': '1242f622-0bc3-43ec-9ff1-8384a68221bf',
  'endDateSemantics': {
    'id': '2c91809d7e7001a5017e70085e320012',
    'value': 'explicit',
    'label': 'Explicit',
    'owner': {
      'id': '2c91809d7e7001a5017e70085e2e0011',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-01-19T09:59:09Z',
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
  'contacts': [{
    'id': '2c91809d7e7001a5017e71c74d26003d',
    'owner': '{id: "1242f622-0bc3-43ec-9ff1-8384a68221bf"}',
    'role': 'erm_librarian',
    'user': 'ca4e1156-0629-4f1e-a8c2-e22176b8d02a'
  }],
  'tags': '[]',
  'lastUpdated': '2022-01-19T09:59:53Z',
  'docs': '[]',
  'name': 'MR License',
  'status': 'active',
  'supplementaryDocs': '[]',
  'description': 'licences description',
  'startDate': '2022-01-02',
  'endDate': '2022-01-30',
  'openEnded': false,
  'amendments': '[]',
  'orgs': '[]',
  'type': 'local',
  'alternateNames': '[]'
};

const initialValues = {
  'id': '1242f622-0bc3-43ec-9ff1-8384a68221bf',
  'endDateSemantics': {
    'id': '2c91809d7e7001a5017e70085e320012',
    'value': 'explicit',
    'label': 'Explicit',
    'owner': {
      'id': '2c91809d7e7001a5017e70085e2e0011',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-01-19T09:59:09Z',
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
  'contacts': [{
    'id': '2c91809d7e7001a5017e71c74d26003d',
    'owner': '{id: "1242f622-0bc3-43ec-9ff1-8384a68221bf"}',
    'role': 'erm_librarian',
    'user': 'ca4e1156-0629-4f1e-a8c2-e22176b8d02a'
  }],
  'tags': '[]',
  'lastUpdated': '2022-01-19T09:59:53Z',
  'docs': '[]',
  'name': 'MR License',
  'status': 'active',
  'supplementaryDocs': '[]',
  'description': 'licences description',
  'startDate': '2022-01-02',
  'endDate': '2022-01-30',
  'openEnded': false,
  'amendments': '[]',
  'orgs': '[]',
  'type': 'local',
  'alternateNames': '[]'
};

export {
  data,
  mutators,
  values,
  initialValues
};
