const urls = {
  licenseView: id => `/licenses/${id}`,
};

const license = {
  'id': '56319d8b-c5f1-4b40-9fa3-78aca5c5f311',
  'name': 'TestLicense',
  'status': {
    'id': '2c91809d843605f00184360ea4c20018',
    'value': 'active',
    'label': 'Active'
  },
  'startDate': '2022-06-01',
  'endDate': '2022-11-30',
  'openEnded': false,
  'orgs': [
    {
      'id': '8f4bd69e-da33-4aed-aa09-35c5f5b14ec1',
      'primaryOrg': true,
      'org': {
        'id': 'a1a97de2-db37-4bef-aeaa-45891c7dd560',
        'name': 'Alexander Street Press',
      }
    }
  ]
};


export { license, urls };
