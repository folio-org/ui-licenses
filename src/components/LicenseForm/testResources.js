const data = {
  'contactRoleValues': [{
    'id': '2c91809d7e2d0fae017e2d169d560001',
    'value': 'authorised_signatory',
    'label': 'Authorised signatory',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d090000',
      'desc': 'InternalContact.Role',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169d600002',
    'value': 'erm_librarian',
    'label': 'ERM Librarian',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d090000',
      'desc': 'InternalContact.Role',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169d670003',
    'value': 'license_owner',
    'label': 'License owner',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d090000',
      'desc': 'InternalContact.Role',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169d6d0004',
    'value': 'negotiator',
    'label': 'Negotiator',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d090000',
      'desc': 'InternalContact.Role',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169d740005',
    'value': 'subject_specialist',
    'label': 'Subject specialist',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d090000',
      'desc': 'InternalContact.Role',
      'internal': false
    }
  }
  ],
  'documentCategories': [{
    'id': '2c91809d7e2d0fae017e2d169d7e0007',
    'value': 'consortium_authorization_statement',
    'label': 'Consortium authorization statement',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d7a0006',
      'desc': 'DocumentAttachment.AtType',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169d840008',
    'value': 'product_data_sheet',
    'label': 'Product data sheet',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d7a0006',
      'desc': 'DocumentAttachment.AtType',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169d8b0009',
    'value': 'vendor_terms_and_conditions',
    'label': 'Vendor terms and conditions',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d7a0006',
      'desc': 'DocumentAttachment.AtType',
      'internal': false
    }
  }
  ],
  'orgRoleValues': [{
    'id': '2c91809d7e2d0fae017e2d169ded001a',
    'value': 'licensor',
    'label': 'Licensor',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169deb0019',
      'desc': 'LicenseOrg.Role',
      'internal': false
    }
  }],
  'statusValues': [{
    'id': '2c91809d7e2d0fae017e2d169dad000f',
    'value': 'in_negotiation',
    'label': 'In negotiation',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169da9000e',
      'desc': 'License.Status',
      'internal': true
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169db40010',
    'value': 'not_yet_active',
    'label': 'Not yet active',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169da9000e',
      'desc': 'License.Status',
      'internal': true
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169dbb0011',
    'value': 'active',
    'label': 'Active',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169da9000e',
      'desc': 'License.Status',
      'internal': true
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169dc20012',
    'value': 'rejected',
    'label': 'Rejected',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169da9000e',
      'desc': 'License.Status',
      'internal': true
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169dca0013',
    'value': 'expired',
    'label': 'Expired',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169da9000e',
      'desc': 'License.Status',
      'internal': true
    }
  }
  ],
  'terms': [{
    'id': '2c91809d7e2d0fae017e2d169faf0028',
    'name': 'authorisedUsers',
    'primary': true,
    'defaultInternal': true,
    'label': 'Definition of authorised user',
    'description': 'The definition of an authorised user for a resource',
    'weight': -1,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a088002a',
    'name': 'remoteAccess',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169ec3001b',
      'desc': 'Yes/No/Other',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169ed6001e", label: "Ot…}',
        '{id: "2c91809d7e2d0fae017e2d169ec7001c", label: "Ye…}',
        '{id: "2c91809d7e2d0fae017e2d169ecd001d", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Access restricted to on-campus/campus network?',
    'description': 'Can access to the resource be provided from outside the library or institutional location / network',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a08d002b',
    'name': 'illElectronic',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169eeb0021", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169ef70022", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f030024", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169efd0023", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169ee30020", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f090025", label: "Un…}',
        '{id: "2c91809d7e2d0fae017e2d169f0f0026", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Electronic ILL',
    'description': 'The right to provide the licensed materials via interlibrary loan by way of electronic copies',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0bb0031',
    'name': 'copyDigital',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169eeb0021", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169ef70022", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f030024", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169efd0023", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169ee30020", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f090025", label: "Un…}',
        '{id: "2c91809d7e2d0fae017e2d169f0f0026", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Making digital copies',
    'description': 'The right of the licensee and authorized users to download and digitally copy a reasonable portion of the licensed materials',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0c00032',
    'name': 'copyPrint',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169eeb0021", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169ef70022", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f030024", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169efd0023", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169ee30020", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f090025", label: "Un…}',
        '{id: "2c91809d7e2d0fae017e2d169f0f0026", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Making print copies',
    'description': 'The right of the licensee and authorized users to print a reasonable portion of the licensed materials',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d169fa60027',
    'name': 'concurrentAccess',
    'primary': true,
    'defaultInternal': true,
    'label': 'Number of concurrent users allowed',
    'description': 'The number of concurrent users allowed by the resource',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0a4002d',
    'name': 'illPrint',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169eeb0021", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169ef70022", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f030024", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169efd0023", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169ee30020", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f090025", label: "Un…}',
        '{id: "2c91809d7e2d0fae017e2d169f0f0026", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Print ILL',
    'description': 'The right to provide the licensed materials via interlibrary loan by way of print copies or facsimile transmission',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a099002c',
    'name': 'illSecureElectronic',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169eeb0021", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169ef70022", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f030024", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169efd0023", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169ee30020", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f090025", label: "Un…}',
        '{id: "2c91809d7e2d0fae017e2d169f0f0026", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Secure Electronic ILL',
    'description': 'The right to provide the licensed materials via interlibrary loan by way of secure electronic transmission',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0aa002e',
    'name': 'reservesElectronic',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169eeb0021", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169ef70022", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f030024", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169efd0023", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169ee30020", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f090025", label: "Un…}',
        '{id: "2c91809d7e2d0fae017e2d169f0f0026", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Storage of electronic copies on secure network',
    'description': 'The right to make electronic copies of the licensed materials and store them on a secure network',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0b1002f',
    'name': 'coursePackElectronic',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169eeb0021", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169ef70022", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f030024", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169efd0023", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169ee30020", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f090025", label: "Un…}',
        '{id: "2c91809d7e2d0fae017e2d169f0f0026", label: "No…}'
      ]
    },
    'defaultInternal': false,
    'label': 'Use in electronic coursepacks',
    'description': 'The right to use licensed materials in collections or compilations of materials assembled in an electronic format by faculty members for use by students in a class for purposes of instruction',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0b70030',
    'name': 'coursePackPrint',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169eeb0021", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169ef70022", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f030024", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169efd0023", label: "Pr…}',
        '{id: "2c91809d7e2d0fae017e2d169ee30020", label: "Pe…}',
        '{id: "2c91809d7e2d0fae017e2d169f090025", label: "Un…}',
        '{id: "2c91809d7e2d0fae017e2d169f0f0026", label: "No…}'
      ]
    },
    'defaultInternal': false,
    'label': 'Use in print course packs',
    'description': 'The right to use licensed materials in collections or compilations of materials assembled in a print format by faculty members for use by students in a class for purposes of instruction',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0820029',
    'name': 'walkInAccess',
    'primary': true,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169ec3001b',
      'desc': 'Yes/No/Other',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169ed6001e", label: "Ot…}',
        '{id: "2c91809d7e2d0fae017e2d169ec7001c", label: "Ye…}',
        '{id: "2c91809d7e2d0fae017e2d169ecd001d", label: "No…}'
      ]
    },
    'defaultInternal': false,
    'label': 'Walk-in access permitted?',
    'description': 'Can non-members of the library/instittuion use the resource when in the library',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0db0038',
    'name': 'authProxy',
    'primary': false,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169ec3001b',
      'desc': 'Yes/No/Other',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169ed6001e", label: "Ot…}',
        '{id: "2c91809d7e2d0fae017e2d169ec7001c", label: "Ye…}',
        '{id: "2c91809d7e2d0fae017e2d169ecd001d", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Access via a proxy supported?',
    'description': 'Whether authentication via a reverse proxy is supported',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0e7003b',
    'name': 'annualOptOut',
    'primary': false,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169ec3001b',
      'desc': 'Yes/No/Other',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169ed6001e", label: "Ot…}',
        '{id: "2c91809d7e2d0fae017e2d169ec7001c", label: "Ye…}',
        '{id: "2c91809d7e2d0fae017e2d169ecd001d", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'Annual opt-out clause included?',
    'description': "Whether the license includes an 'annual opt-out' clause within a multi-year agreement",
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0d80037',
    'name': 'authIP',
    'primary': false,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169ec3001b',
      'desc': 'Yes/No/Other',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169ed6001e", label: "Ot…}',
        '{id: "2c91809d7e2d0fae017e2d169ec7001c", label: "Ye…}',
        '{id: "2c91809d7e2d0fae017e2d169ecd001d", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'IP authentication supported?',
    'description': 'Whether authentication via IP range is supported',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0d30036',
    'name': 'metadataUsage',
    'primary': false,
    'defaultInternal': true,
    'label': 'Metadata usage',
    'description': 'Any restrictions expressed related to the use of metadata in the platforms',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0c80034',
    'name': 'otherRestrictions',
    'primary': false,
    'defaultInternal': true,
    'label': 'Other restrictions',
    'description': 'Other restrictions expressed in the license',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0e3003a',
    'name': 'authSAML',
    'primary': false,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169ec3001b',
      'desc': 'Yes/No/Other',
      'internal': false,
      'values': [
        '{id: "2c91809d7e2d0fae017e2d169ed6001e", label: "Ot…}',
        '{id: "2c91809d7e2d0fae017e2d169ec7001c", label: "Ye…}',
        '{id: "2c91809d7e2d0fae017e2d169ecd001d", label: "No…}'
      ]
    },
    'defaultInternal': true,
    'label': 'SAML compliant authentication supported?',
    'description': 'Whether authentication via SAML compliant method is supported',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0c40033',
    'name': 'scholarlySharing',
    'primary': false,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [{
        'id': '2c91809d7e2d0fae017e2d169eeb0021',
        'value': 'permitted_(explicit)_under_conditions',
        'label': 'Permitted (explicit) under conditions'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169ef70022',
        'value': 'permitted_(interpreted)',
        'label': 'Permitted (interpreted)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169f030024',
        'value': 'prohibited_(interpreted)',
        'label': 'Prohibited (interpreted)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169efd0023',
        'value': 'prohibited_(explicit)',
        'label': 'Prohibited (explicit)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169ee30020',
        'value': 'permitted_(explicit)',
        'label': 'Permitted (explicit)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169f090025',
        'value': 'unmentioned',
        'label': 'Unmentioned'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169f0f0026',
        'value': 'not_applicable',
        'label': 'Not applicable'
      }
      ]
    },
    'defaultInternal': true,
    'label': 'Sharing for scholarly use',
    'description': 'The right of authorized users and/or licensee to transmit hard copy or electronic copy of reasonable amounts of licensed materials to a third party for personal, scholarly, educational, scientific or professional use',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0cd0035',
    'name': 'textAndDataMining',
    'primary': false,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169edc001f',
      'desc': 'Permitted/Prohibited',
      'internal': false,
      'values': [{
        'id': '2c91809d7e2d0fae017e2d169eeb0021',
        'value': 'permitted_(explicit)_under_conditions',
        'label': 'Permitted (explicit) under conditions'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169ef70022',
        'value': 'permitted_(interpreted)',
        'label': 'Permitted (interpreted)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169f030024',
        'value': 'prohibited_(interpreted)',
        'label': 'Prohibited (interpreted)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169efd0023',
        'value': 'prohibited_(explicit)',
        'label': 'Prohibited (explicit)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169ee30020',
        'value': 'permitted_(explicit)',
        'label': 'Permitted (explicit)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169f090025',
        'value': 'unmentioned',
        'label': 'Unmentioned'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169f0f0026',
        'value': 'not_applicable',
        'label': 'Not applicable'
      }
      ]
    },
    'defaultInternal': false,
    'label': 'Text and Data mining',
    'description': 'Whether it is permitted to use text and data mining processes on the content of the resource',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0e9003c',
    'name': 'APCAndOffsetting',
    'primary': false,
    'defaultInternal': true,
    'label': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
    'description': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
  },
  {
    'id': '2c91809d7e2d0fae017e2d16a0df0039',
    'name': 'postCancellationAccess',
    'primary': false,
    'category': {
      'id': '2c91809d7e2d0fae017e2d169ec3001b',
      'desc': 'Yes/No/Other',
      'internal': false,
      'values': [{
        'id': '2c91809d7e2d0fae017e2d169ed6001e',
        'value': 'other_(see_notes)',
        'label': 'Other (see notes)'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169ec7001c',
        'value': 'yes',
        'label': 'Yes'
      },
      {
        'id': '2c91809d7e2d0fae017e2d169ecd001d',
        'value': 'no',
        'label': 'No'
      }
      ]
    },
    'defaultInternal': true,
    'label': 'Post-cancellation terms included?',
    'description': 'Does the license include post-cancellation terms?',
    'weight': 1,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  }
  ],
  'typeValues': [{
    'id': '2c91809d7e2d0fae017e2d169dd30015',
    'value': 'local',
    'label': 'Local',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169dd10014',
      'desc': 'License.Type',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169dda0016',
    'value': 'consortial',
    'label': 'Consortial',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169dd10014',
      'desc': 'License.Type',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169de00017',
    'value': 'national',
    'label': 'National',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169dd10014',
      'desc': 'License.Type',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e2d0fae017e2d169de50018',
    'value': 'alliance',
    'label': 'Alliance',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169dd10014',
      'desc': 'License.Type',
      'internal': false
    }
  }
  ],
  'users': [{
    'username': 'acq-admin',
    'id': '339ce9bd-2067-4ba2-a379-152960b58329',
    'barcode': '1641434514810243623',
    'active': true,
    'type': 'patron',
    'patronGroup': '3684a786-6671-4268-8ed0-9db82ebca60b',
    'departments': '[]',
    'proxyFor': '[]',
    'personal': {
      'lastName': 'Admin',
      'firstName': 'acq-admin',
      'addresses': []
    },
    'createdDate': '2022-01-06T02:01:54.834+00:00',
    'updatedDate': '2022-01-06T02:01:54.834+00:00',
    'metadata': {
      'createdDate': '2022-01-06T02:01:54.832+00:00',
      'createdByUserId': '0fc2f695-07f9-5080-817b-364db1480f9e',
      'updatedDate': '2022-01-06T02:01:54.832+00:00',
      'updatedByUserId': '0fc2f695-07f9-5080-817b-364db1480f9e'
    }
  }]
};

const initialValues = {
  'id': '24e90687-2584-4cf7-ad87-556a6ae0e72c',
  'endDateSemantics': {
    'id': '2c91809d7e2d0fae017e2d169d96000b',
    'value': 'explicit',
    'label': 'Explicit',
    'owner': {
      'id': '2c91809d7e2d0fae017e2d169d92000a',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-01-06T16:11:08Z',
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
  'contacts': [{
    'id': '2c91809d7e2d0fae017e302882e6003d',
    'owner': {
      'id': '24e90687-2584-4cf7-ad87-556a6ae0e72c'
    },
    'role': 'license_owner',
    'user': '339ce9bd-2067-4ba2-a379-152960b58329'
  }],
  'tags': '[]',
  'lastUpdated': '2022-01-06T16:11:08Z',
  'docs': '[]',
  'name': 'MR Licenses Test',
  'status': 'active',
  'supplementaryDocs': '[]',
  'description': 'Description',
  'startDate': '2022-01-02',
  'endDate': '2022-01-22',
  'openEnded': false,
  'amendments': '[]',
  'orgs': [{
    'id': '47940504-26aa-41a0-b20f-8e64da8b9eb0',
    'primaryOrg': false,
    'org': {
      'id': '64e43247-e27a-4370-bfe0-b655e50d9573',
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
        'aliases': [{
          'value': 'Alexander Street',
          'description': ''
        }],
        'addresses': [{
          'addressLine1': '3212 Duke Street',
          'addressLine2': '',
          'city': 'Alexandria',
          'stateRegion': 'VA',
          'zipCode': '22314',
          'country': 'USA',
          'isPrimary': true,
          'categories': '[]',
          'language': 'English'
        }],
        'phoneNumbers': [{
          'phoneNumber': '1-800-889-5937',
          'categories': '[]',
          'isPrimary': true,
          'language': 'English'
        }],
        'emails': [{
          'value': 'customerservice@alexanderstreet.com',
          'description': 'main customer service email',
          'isPrimary': true,
          'categories': '[]',
          'language': 'English'
        }],
        'urls': [{
          'value': 'https://alexanderstreet.com/',
          'description': 'main website',
          'language': 'en-us',
          'isPrimary': true,
          'categories': [
            'f52ceea4-8e35-404b-9ebd-5c7db6613195'
          ],
          'notes': ''
        }],
        'contacts': [
          '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1'
        ],
        'agreements': [{
          'name': 'library access',
          'discount': 0,
          'referenceUrl': '',
          'notes': ''
        }],
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
        'accounts': [{
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
          'acqUnitIds': '[]'
        }],
        'isVendor': true,
        'sanCode': '1234567',
        'changelogs': [{
          'description': 'This is a sample note.',
          'timestamp': '2008-05-15T10:53:00.000+00:00'
        }],
        'acqUnitIds': '[]',
        'metadata': {
          'createdDate': '2022-01-06T01:52:12.927+00:00',
          'updatedDate': '2022-01-06T01:52:12.927+00:00'
        }
      }
    },
    'owner': {
      'id': '24e90687-2584-4cf7-ad87-556a6ae0e72c'
    },
    'roles': [{
      'id': 'ef649052-9962-4694-abaa-ec68a51e8c50',
      'owner': {
        'id': '47940504-26aa-41a0-b20f-8e64da8b9eb0'
      },
      'role': {
        'id': '2c91809d7e2d0fae017e2d169ded001a',
        'value': 'licensor',
        'label': 'Licensor',
        'owner': {
          'id': '2c91809d7e2d0fae017e2d169deb0019',
          'desc': 'LicenseOrg.Role',
          'internal': false
        }
      },
      'note': 'Licensor note'
    }],
    'note': 'This is note'
  }],
  'type': 'local',
  'alternateNames': [{
    'id': '3c893e2a-5f1c-4b28-b204-c5b4b32c22dd',
    'owner': {
      'id': '24e90687-2584-4cf7-ad87-556a6ae0e72c'
    },
    'name': 'Test'
  }]
};

const form = {
  'batch': 'ƒ batch() {}',
  'blur': 'ƒ blur() {}',
  'change': 'ƒ change() {}',
  'destroyOnUnregister': false,
  'focus': 'ƒ focus() {}',
  'mutators': {
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
  },
  'getFieldState': 'ƒ getFieldState() {}',
  'getRegisteredFields': 'ƒ getRegisteredFields() {}',
  'getState': 'ƒ getState() {}',
  'initialize': 'ƒ initialize() {}',
  'isValidationPaused': 'ƒ isValidationPaused() {}',
  'pauseValidation': 'ƒ pauseValidation() {}',
  'registerField': 'ƒ registerField() {}',
  'reset': 'ƒ reset() {}',
  'resetFieldState': 'ƒ resetFieldState() {}',
  'restart': 'ƒ restart() {}',
  'resumeValidation': 'ƒ resumeValidation() {}',
  'setConfig': 'ƒ setConfig() {}',
  'submit': 'ƒ () {}',
  'subscribe': 'ƒ subscribe() {}'
};

export {
  data,
  initialValues,
  form
};
