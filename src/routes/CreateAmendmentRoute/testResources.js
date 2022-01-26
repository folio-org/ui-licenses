const match = {
  'path': '/licenses/:id/amendments/create',
  'url': '/licenses/92006f86-fd78-4398-9077-123209f21409/amendments/create',
  'isExact': true,
  'params': {
    'id': '92006f86-fd78-4398-9077-123209f21409'
  }
};

const resources = {
  'license': {
    'hasLoaded': true,
    'isPending': false,
    'failed': false,
    'records': [{
      'id': '92006f86-fd78-4398-9077-123209f21409',
      'endDateSemantics': {
        'id': '02d318287e4deba0017e4ded8bf30014',
        'value': 'implicit',
        'label': 'Implicit',
        'owner': {
          'id': '02d318287e4deba0017e4ded8bd90011',
          'desc': 'License.EndDateSemantics',
          'internal': true
        }
      },
      'dateCreated': '2022-01-12T16:19:24Z',
      'customProperties': {},
      'contacts': [],
      'tags': [],
      'lastUpdated': '2022-01-18T16:08:38Z',
      'docs': [],
      'name': 'Interface license 1',
      'status': {
        'id': '02d318287e4deba0017e4ded8c100018',
        'value': 'active',
        'label': 'Active',
        'owner': {
          'id': '02d318287e4deba0017e4ded8bfb0015',
          'desc': 'License.Status',
          'internal': true
        }
      },
      'supplementaryDocs': [],
      'openEnded': false,
      'amendments': [],
      'orgs': [{
        'id': 'ba19bf5c-a068-493e-bbb6-9b55be4e6b8c',
        'primaryOrg': false,
        'org': {
          'id': '45e9a56b-a04c-4e2d-a17d-2bdfda89836c',
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
              'categories': [],
              'language': 'English'
            }],
            'phoneNumbers': [{
              'phoneNumber': '1-800-889-5937',
              'categories': [],
              'isPrimary': true,
              'language': 'English'
            }],
            'emails': [{
              'value': 'customerservice@alexanderstreet.com',
              'description': 'main customer service email',
              'isPrimary': true,
              'categories': [],
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
              '14e81009-0f98-45a0-b8e6-e25547beb22f',
              '29298968-a603-45c7-b2b9-1ed5e6346853'
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
              'acqUnitIds': []
            }],
            'isVendor': true,
            'sanCode': '1234567',
            'changelogs': [{
              'description': 'This is a sample note.',
              'timestamp': '2008-05-15T10:53:00.000+00:00'
            }],
            'acqUnitIds': [],
            'metadata': {
              'createdDate': '2022-01-12T02:50:36.718+00:00',
              'updatedDate': '2022-01-12T11:34:19.450+00:00',
              'updatedByUserId': '0ddf4027-b8ca-50f7-b0a2-9c61260d6d0d'
            }
          }
        },
        'owner': {
          'id': '92006f86-fd78-4398-9077-123209f21409'
        },
        'roles': [{
          'id': '4aa763bd-738d-48c0-ba28-428aac839d99',
          'owner': {
            'id': 'ba19bf5c-a068-493e-bbb6-9b55be4e6b8c'
          },
          'role': {
            'id': '02d318287e4deba0017e4ded8bd10010',
            'value': 'licensor',
            'label': 'Licensor',
            'owner': {
              'id': '02d318287e4deba0017e4ded8bcd000f',
              'desc': 'LicenseOrg.Role',
              'internal': false
            }
          }
        }]
      }],
      'type': {
        'id': '02d318287e4deba0017e4ded8b480001',
        'value': 'local',
        'label': 'Local',
        'owner': {
          'id': '02d318287e4deba0017e4ded8b1c0000',
          'desc': 'License.Type',
          'internal': false
        }
      },
      'alternateNames': []
    }],
    'successfulMutations': [{
      'type': 'PUT',
      'record': {
        'id': '92006f86-fd78-4398-9077-123209f21409',
        'endDateSemantics': {
          'id': '02d318287e4deba0017e4ded8bf30014',
          'value': 'implicit',
          'label': 'Implicit',
          'owner': {
            'id': '02d318287e4deba0017e4ded8bd90011',
            'desc': 'License.EndDateSemantics',
            'internal': true
          }
        },
        'dateCreated': '2022-01-12T16:19:24Z',
        'customProperties': {},
        'contacts': [],
        'tags': [],
        'lastUpdated': '2022-01-18T16:08:38Z',
        'docs': [],
        'name': 'Interface license 1',
        'status': {
          'id': '02d318287e4deba0017e4ded8c100018',
          'value': 'active',
          'label': 'Active',
          'owner': {
            'id': '02d318287e4deba0017e4ded8bfb0015',
            'desc': 'License.Status',
            'internal': true
          }
        },
        'supplementaryDocs': [],
        'openEnded': false,
        'amendments': [],
        'orgs': [{
          'id': 'ba19bf5c-a068-493e-bbb6-9b55be4e6b8c',
          'primaryOrg': false,
          'org': {
            'id': '45e9a56b-a04c-4e2d-a17d-2bdfda89836c',
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
                'categories': [],
                'language': 'English'
              }],
              'phoneNumbers': [{
                'phoneNumber': '1-800-889-5937',
                'categories': [],
                'isPrimary': true,
                'language': 'English'
              }],
              'emails': [{
                'value': 'customerservice@alexanderstreet.com',
                'description': 'main customer service email',
                'isPrimary': true,
                'categories': [],
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
                '14e81009-0f98-45a0-b8e6-e25547beb22f',
                '29298968-a603-45c7-b2b9-1ed5e6346853'
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
                'acqUnitIds': []
              }],
              'isVendor': true,
              'sanCode': '1234567',
              'changelogs': [{
                'description': 'This is a sample note.',
                'timestamp': '2008-05-15T10:53:00.000+00:00'
              }],
              'acqUnitIds': [],
              'metadata': {
                'createdDate': '2022-01-12T02:50:36.718+00:00',
                'updatedDate': '2022-01-12T11:34:19.450+00:00',
                'updatedByUserId': '0ddf4027-b8ca-50f7-b0a2-9c61260d6d0d'
              }
            }
          },
          'owner': {
            'id': '92006f86-fd78-4398-9077-123209f21409'
          },
          'roles': [{
            'id': '4aa763bd-738d-48c0-ba28-428aac839d99',
            'owner': {
              'id': 'ba19bf5c-a068-493e-bbb6-9b55be4e6b8c'
            },
            'role': {
              'id': '02d318287e4deba0017e4ded8bd10010',
              'value': 'licensor',
              'label': 'Licensor',
              'owner': {
                'id': '02d318287e4deba0017e4ded8bcd000f',
                'desc': 'LicenseOrg.Role',
                'internal': false
              }
            }
          }]
        }],
        'type': {
          'id': '02d318287e4deba0017e4ded8b480001',
          'value': 'local',
          'label': 'Local',
          'owner': {
            'id': '02d318287e4deba0017e4ded8b1c0000',
            'desc': 'License.Type',
            'internal': false
          }
        },
        'alternateNames': []
      }
    },
    {
      'type': 'PUT',
      'record': {
        'id': '92006f86-fd78-4398-9077-123209f21409',
        'endDateSemantics': {
          'id': '02d318287e4deba0017e4ded8bf30014',
          'value': 'implicit',
          'label': 'Implicit',
          'owner': {
            'id': '02d318287e4deba0017e4ded8bd90011',
            'desc': 'License.EndDateSemantics',
            'internal': true
          }
        },
        'dateCreated': '2022-01-12T16:19:24Z',
        'customProperties': {},
        'contacts': [],
        'tags': [],
        'lastUpdated': '2022-01-18T16:08:24Z',
        'docs': [],
        'name': 'Interface license 1',
        'status': {
          'id': '02d318287e4deba0017e4ded8c100018',
          'value': 'active',
          'label': 'Active',
          'owner': {
            'id': '02d318287e4deba0017e4ded8bfb0015',
            'desc': 'License.Status',
            'internal': true
          }
        },
        'supplementaryDocs': [],
        'openEnded': false,
        'amendments': [{
          'id': '1fdff993-9c1c-416f-a9b3-b258b59ed7ef',
          'endDateSemantics': {
            'id': '02d318287e4deba0017e4ded8bf30014',
            'value': 'implicit',
            'label': 'Implicit',
            'owner': {
              'id': '02d318287e4deba0017e4ded8bd90011',
              'desc': 'License.EndDateSemantics',
              'internal': true
            }
          },
          'dateCreated': '2022-01-18T16:08:24Z',
          'customProperties': {},
          'lastUpdated': '2022-01-18T16:08:24Z',
          'name': 'Amendment 1',
          'status': {
            'id': '02d318287e4deba0017e4ded8c100018',
            'value': 'active',
            'label': 'Active',
            'owner': {
              'id': '02d318287e4deba0017e4ded8bfb0015',
              'desc': 'License.Status',
              'internal': true
            }
          },
          'startDate': '2022-01-01',
          'openEnded': false
        }],
        'orgs': [{
          'id': 'ba19bf5c-a068-493e-bbb6-9b55be4e6b8c',
          'primaryOrg': false,
          'org': {
            'id': '45e9a56b-a04c-4e2d-a17d-2bdfda89836c',
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
                'categories': [],
                'language': 'English'
              }],
              'phoneNumbers': [{
                'phoneNumber': '1-800-889-5937',
                'categories': [],
                'isPrimary': true,
                'language': 'English'
              }],
              'emails': [{
                'value': 'customerservice@alexanderstreet.com',
                'description': 'main customer service email',
                'isPrimary': true,
                'categories': [],
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
                '14e81009-0f98-45a0-b8e6-e25547beb22f',
                '29298968-a603-45c7-b2b9-1ed5e6346853'
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
                'acqUnitIds': []
              }],
              'isVendor': true,
              'sanCode': '1234567',
              'changelogs': [{
                'description': 'This is a sample note.',
                'timestamp': '2008-05-15T10:53:00.000+00:00'
              }],
              'acqUnitIds': [],
              'metadata': {
                'createdDate': '2022-01-12T02:50:36.718+00:00',
                'updatedDate': '2022-01-12T11:34:19.450+00:00',
                'updatedByUserId': '0ddf4027-b8ca-50f7-b0a2-9c61260d6d0d'
              }
            }
          },
          'owner': {
            'id': '92006f86-fd78-4398-9077-123209f21409'
          },
          'roles': [{
            'id': '4aa763bd-738d-48c0-ba28-428aac839d99',
            'owner': {
              'id': 'ba19bf5c-a068-493e-bbb6-9b55be4e6b8c'
            },
            'role': {
              'id': '02d318287e4deba0017e4ded8bd10010',
              'value': 'licensor',
              'label': 'Licensor',
              'owner': {
                'id': '02d318287e4deba0017e4ded8bcd000f',
                'desc': 'LicenseOrg.Role',
                'internal': false
              }
            }
          }]
        }],
        'type': {
          'id': '02d318287e4deba0017e4ded8b480001',
          'value': 'local',
          'label': 'Local',
          'owner': {
            'id': '02d318287e4deba0017e4ded8b1c0000',
            'desc': 'License.Type',
            'internal': false
          }
        },
        'alternateNames': []
      }
    }
    ],
    'failedMutations': [],
    'pendingMutations': [],
    'loadedAt': '2022-01-18T16:08:43.261Z',
    'url': 'http://130.83.152.168:9130/licenses/licenses/92006f86-fd78-4398-9077-123209f21409',
    'headers': {},
    'httpStatus': 200,
    'other': {
      'totalRecords': null
    },
    'resource': 'license',
    'module': '@folio/licenses',
    'throwErrors': true
  },
  'documentCategories': {
    'hasLoaded': true,
    'isPending': false,
    'failed': false,
    'records': [{
      'id': '02d318287e4deba0017e4ded8bb3000c',
      'value': 'consortium_authorization_statement',
      'label': 'Consortium authorization statement',
      'owner': {
        'id': '02d318287e4deba0017e4ded8baf000b',
        'desc': 'DocumentAttachment.AtType',
        'internal': false
      }
    },
    {
      'id': '02d318287e4deba0017e4ded8bbd000d',
      'value': 'product_data_sheet',
      'label': 'Product data sheet',
      'owner': {
        'id': '02d318287e4deba0017e4ded8baf000b',
        'desc': 'DocumentAttachment.AtType',
        'internal': false
      }
    },
    {
      'id': '02d318287e4deba0017e4ded8bc5000e',
      'value': 'vendor_terms_and_conditions',
      'label': 'Vendor terms and conditions',
      'owner': {
        'id': '02d318287e4deba0017e4ded8baf000b',
        'desc': 'DocumentAttachment.AtType',
        'internal': false
      }
    }
    ],
    'successfulMutations': [],
    'failedMutations': [],
    'pendingMutations': [],
    'loadedAt': '2022-01-18T16:08:43.190Z',
    'url': 'http://130.83.152.168:9130/licenses/refdata/DocumentAttachment/atType?perPage=100',
    'headers': {},
    'httpStatus': 200,
    'other': {
      'totalRecords': null
    },
    'resource': 'documentCategories',
    'module': '@folio/licenses',
    'throwErrors': true
  },
  'statusValues': {
    'hasLoaded': true,
    'isPending': false,
    'failed': false,
    'records': [{
      'id': '02d318287e4deba0017e4ded8bff0016',
      'value': 'in_negotiation',
      'label': 'In negotiation',
      'owner': {
        'id': '02d318287e4deba0017e4ded8bfb0015',
        'desc': 'License.Status',
        'internal': true
      }
    },
    {
      'id': '02d318287e4deba0017e4ded8c070017',
      'value': 'not_yet_active',
      'label': 'Not yet active',
      'owner': {
        'id': '02d318287e4deba0017e4ded8bfb0015',
        'desc': 'License.Status',
        'internal': true
      }
    },
    {
      'id': '02d318287e4deba0017e4ded8c100018',
      'value': 'active',
      'label': 'Active',
      'owner': {
        'id': '02d318287e4deba0017e4ded8bfb0015',
        'desc': 'License.Status',
        'internal': true
      }
    },
    {
      'id': '02d318287e4deba0017e4ded8c180019',
      'value': 'rejected',
      'label': 'Rejected',
      'owner': {
        'id': '02d318287e4deba0017e4ded8bfb0015',
        'desc': 'License.Status',
        'internal': true
      }
    },
    {
      'id': '02d318287e4deba0017e4ded8c21001a',
      'value': 'expired',
      'label': 'Expired',
      'owner': {
        'id': '02d318287e4deba0017e4ded8bfb0015',
        'desc': 'License.Status',
        'internal': true
      }
    }
    ],
    'successfulMutations': [],
    'failedMutations': [],
    'pendingMutations': [],
    'loadedAt': '2022-01-18T16:08:43.206Z',
    'url': 'http://130.83.152.168:9130/licenses/refdata/License/status',
    'headers': {},
    'httpStatus': 200,
    'other': {
      'totalRecords': null
    },
    'resource': 'statusValues',
    'module': '@folio/licenses',
    'throwErrors': true
  },
  'terms': {
    'hasLoaded': true,
    'isPending': false,
    'failed': false,
    'records': [{
      'id': '02d318287e4deba0017e4ded8e850028',
      'name': 'authorisedUsers',
      'primary': true,
      'defaultInternal': true,
      'label': 'Definition of authorised user',
      'description': 'The definition of an authorised user for a resource',
      'weight': -1,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '02d318287e4deba0017e4ded8ee9002a',
      'name': 'remoteAccess',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8cfe001b',
        'desc': 'Yes/No/Other',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d11001e',
          'value': 'other_(see_notes)',
          'label': 'Other (see notes)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d01001c',
          'value': 'yes',
          'label': 'Yes'
        },
        {
          'id': '02d318287e4deba0017e4ded8d09001d',
          'value': 'no',
          'label': 'No'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Access restricted to on-campus/campus network?',
      'description': 'Can access to the resource be provided from outside the library or institutional location / network',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8ef1002b',
      'name': 'illElectronic',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
          'value': 'not_applicable',
          'label': 'Not applicable'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Electronic ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of electronic copies',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f130031',
      'name': 'copyDigital',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
          'value': 'not_applicable',
          'label': 'Not applicable'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Making digital copies',
      'description': 'The right of the licensee and authorized users to download and digitally copy a reasonable portion of the licensed materials',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f180032',
      'name': 'copyPrint',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
          'value': 'not_applicable',
          'label': 'Not applicable'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Making print copies',
      'description': 'The right of the licensee and authorized users to print a reasonable portion of the licensed materials',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8e7f0027',
      'name': 'concurrentAccess',
      'primary': true,
      'defaultInternal': true,
      'label': 'Number of concurrent users allowed',
      'description': 'The number of concurrent users allowed by the resource',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
    },
    {
      'id': '02d318287e4deba0017e4ded8f01002d',
      'name': 'illPrint',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
          'value': 'not_applicable',
          'label': 'Not applicable'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Print ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of print copies or facsimile transmission',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8ef8002c',
      'name': 'illSecureElectronic',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
          'value': 'not_applicable',
          'label': 'Not applicable'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Secure Electronic ILL',
      'description': 'The right to provide the licensed materials via interlibrary loan by way of secure electronic transmission',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f05002e',
      'name': 'reservesElectronic',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
          'value': 'not_applicable',
          'label': 'Not applicable'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Storage of electronic copies on secure network',
      'description': 'The right to make electronic copies of the licensed materials and store them on a secure network',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f0a002f',
      'name': 'coursePackElectronic',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
          'value': 'not_applicable',
          'label': 'Not applicable'
        }
        ]
      },
      'defaultInternal': false,
      'label': 'Use in electronic coursepacks',
      'description': 'The right to use licensed materials in collections or compilations of materials assembled in an electronic format by faculty members for use by students in a class for purposes of instruction',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f0f0030',
      'name': 'coursePackPrint',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
          'value': 'not_applicable',
          'label': 'Not applicable'
        }
        ]
      },
      'defaultInternal': false,
      'label': 'Use in print course packs',
      'description': 'The right to use licensed materials in collections or compilations of materials assembled in a print format by faculty members for use by students in a class for purposes of instruction',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8ee00029',
      'name': 'walkInAccess',
      'primary': true,
      'category': {
        'id': '02d318287e4deba0017e4ded8cfe001b',
        'desc': 'Yes/No/Other',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d11001e',
          'value': 'other_(see_notes)',
          'label': 'Other (see notes)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d01001c',
          'value': 'yes',
          'label': 'Yes'
        },
        {
          'id': '02d318287e4deba0017e4ded8d09001d',
          'value': 'no',
          'label': 'No'
        }
        ]
      },
      'defaultInternal': false,
      'label': 'Walk-in access permitted?',
      'description': 'Can non-members of the library/instittuion use the resource when in the library',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f320038',
      'name': 'authProxy',
      'primary': false,
      'category': {
        'id': '02d318287e4deba0017e4ded8cfe001b',
        'desc': 'Yes/No/Other',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d11001e',
          'value': 'other_(see_notes)',
          'label': 'Other (see notes)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d01001c',
          'value': 'yes',
          'label': 'Yes'
        },
        {
          'id': '02d318287e4deba0017e4ded8d09001d',
          'value': 'no',
          'label': 'No'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Access via a proxy supported?',
      'description': 'Whether authentication via a reverse proxy is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f41003b',
      'name': 'annualOptOut',
      'primary': false,
      'category': {
        'id': '02d318287e4deba0017e4ded8cfe001b',
        'desc': 'Yes/No/Other',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d11001e',
          'value': 'other_(see_notes)',
          'label': 'Other (see notes)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d01001c',
          'value': 'yes',
          'label': 'Yes'
        },
        {
          'id': '02d318287e4deba0017e4ded8d09001d',
          'value': 'no',
          'label': 'No'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'Annual opt-out clause included?',
      'description': "Whether the license includes an 'annual opt-out' clause within a multi-year agreement",
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f2e0037',
      'name': 'authIP',
      'primary': false,
      'category': {
        'id': '02d318287e4deba0017e4ded8cfe001b',
        'desc': 'Yes/No/Other',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d11001e',
          'value': 'other_(see_notes)',
          'label': 'Other (see notes)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d01001c',
          'value': 'yes',
          'label': 'Yes'
        },
        {
          'id': '02d318287e4deba0017e4ded8d09001d',
          'value': 'no',
          'label': 'No'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'IP authentication supported?',
      'description': 'Whether authentication via IP range is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f290036',
      'name': 'metadataUsage',
      'primary': false,
      'defaultInternal': true,
      'label': 'Metadata usage',
      'description': 'Any restrictions expressed related to the use of metadata in the platforms',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '02d318287e4deba0017e4ded8f200034',
      'name': 'otherRestrictions',
      'primary': false,
      'defaultInternal': true,
      'label': 'Other restrictions',
      'description': 'Other restrictions expressed in the license',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '02d318287e4deba0017e4ded8f3c003a',
      'name': 'authSAML',
      'primary': false,
      'category': {
        'id': '02d318287e4deba0017e4ded8cfe001b',
        'desc': 'Yes/No/Other',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d11001e',
          'value': 'other_(see_notes)',
          'label': 'Other (see notes)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d01001c',
          'value': 'yes',
          'label': 'Yes'
        },
        {
          'id': '02d318287e4deba0017e4ded8d09001d',
          'value': 'no',
          'label': 'No'
        }
        ]
      },
      'defaultInternal': true,
      'label': 'SAML compliant authentication supported?',
      'description': 'Whether authentication via SAML compliant method is supported',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
    },
    {
      'id': '02d318287e4deba0017e4ded8f1d0033',
      'name': 'scholarlySharing',
      'primary': false,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
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
      'id': '02d318287e4deba0017e4ded8f250035',
      'name': 'textAndDataMining',
      'primary': false,
      'category': {
        'id': '02d318287e4deba0017e4ded8d18001f',
        'desc': 'Permitted/Prohibited',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d870022',
          'value': 'permitted_(interpreted)',
          'label': 'Permitted (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8dc50024',
          'value': 'prohibited_(interpreted)',
          'label': 'Prohibited (interpreted)'
        },
        {
          'id': '02d318287e4deba0017e4ded8deb0025',
          'value': 'unmentioned',
          'label': 'Unmentioned'
        },
        {
          'id': '02d318287e4deba0017e4ded8d970023',
          'value': 'prohibited_(explicit)',
          'label': 'Prohibited (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d1b0020',
          'value': 'permitted_(explicit)',
          'label': 'Permitted (explicit)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d230021',
          'value': 'permitted_(explicit)_under_conditions',
          'label': 'Permitted (explicit) under conditions'
        },
        {
          'id': '02d318287e4deba0017e4ded8e1b0026',
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
      'id': '02d318287e4deba0017e4ded8f43003c',
      'name': 'APCAndOffsetting',
      'primary': false,
      'defaultInternal': true,
      'label': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
      'description': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    },
    {
      'id': '02d318287e4deba0017e4ded8f370039',
      'name': 'postCancellationAccess',
      'primary': false,
      'category': {
        'id': '02d318287e4deba0017e4ded8cfe001b',
        'desc': 'Yes/No/Other',
        'internal': false,
        'values': [{
          'id': '02d318287e4deba0017e4ded8d11001e',
          'value': 'other_(see_notes)',
          'label': 'Other (see notes)'
        },
        {
          'id': '02d318287e4deba0017e4ded8d01001c',
          'value': 'yes',
          'label': 'Yes'
        },
        {
          'id': '02d318287e4deba0017e4ded8d09001d',
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
    'successfulMutations': [],
    'failedMutations': [],
    'pendingMutations': [],
    'loadedAt': '2022-01-18T16:08:43.269Z',
    'url': 'http://130.83.152.168:9130/licenses/custprops',
    'headers': {},
    'httpStatus': 200,
    'other': {
      'totalRecords': null
    },
    'resource': 'terms',
    'module': '@folio/licenses',
    'throwErrors': true
  }
};

export {
  match,
  resources,
};
