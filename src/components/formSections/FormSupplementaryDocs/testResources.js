const data = {
  'documentCategories': [{
    'id': '2c91809d7e6adbbf017e6ae2dc370007',
    'value': 'consortium_authorization_statement',
    'label': 'Consortium authorization statement',
    'owner': {
      'id': '2c91809d7e6adbbf017e6ae2dc320006',
      'desc': 'DocumentAttachment.AtType',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e6adbbf017e6ae2dc3f0008',
    'value': 'product_data_sheet',
    'label': 'Product data sheet',
    'owner': {
      'id': '2c91809d7e6adbbf017e6ae2dc320006',
      'desc': 'DocumentAttachment.AtType',
      'internal': false
    }
  },
  {
    'id': '2c91809d7e6adbbf017e6ae2dc460009',
    'value': 'vendor_terms_and_conditions',
    'label': 'Vendor terms and conditions',
    'owner': {
      'id': '2c91809d7e6adbbf017e6ae2dc320006',
      'desc': 'DocumentAttachment.AtType',
      'internal': false
    }
  }
  ],
};

const initialValues = {
  'id': '9bc32c30-ffc6-4970-b741-95e7eddc3afa',
  'endDateSemantics': {
    'id': '2c91809d7e6adbbf017e6ae2dc52000b',
    'value': 'explicit',
    'label': 'Explicit',
    'owner': {
      'id': '2c91809d7e6adbbf017e6ae2dc4f000a',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-01-18T09:32:20Z',
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
  'lastUpdated': '2022-01-18T13:35:10Z',
  'docs': [{
    'id': 'd7042b02-3c7e-48c6-888e-e3c9d005b287',
    'dateCreated': '2022-01-18T12:40:14Z',
    'lastUpdated': '2022-01-18T12:40:14Z',
    'fileUpload': {
      'id': '14d6f399-20bc-44ee-b7d9-1ee46b5184e1',
      'contentType': 'image/png',
      'size': 14752,
      'modified': '2022-01-18T12:40:14Z',
      'name': 'Amendment.png'
    },
    'name': 'Core Docs test',
    'note': 'note'
  }],
  'name': 'MR License',
  'status': 'active',
  'supplementaryDocs': [{
    'id': 'd8570342-cb21-4ee2-b55b-d584d93951af',
    'dateCreated': '2022-01-18T13:35:10Z',
    'lastUpdated': '2022-01-18T13:35:10Z',
    'atType': 'vendor_terms_and_conditions',
    'fileUpload': {
      'id': '6d89bbb1-73df-48b6-bcfa-717053151767',
      'contentType': 'image/png',
      'size': 7843,
      'modified': '2022-01-18T13:35:10Z',
      'name': 'UrlCustomizerViewRoute.png'
    },
    'name': 'supplementary documents test',
    'note': 'note'
  }],
  'description': 'description',
  'startDate': '2022-01-12',
  'endDate': '2022-01-27',
  'openEnded': false,
  'amendments': [{
    'id': '69a0041c-a246-4944-ab6c-3cf3d77df064',
    'endDateSemantics': '{id: "2c91809d7e6adbbf017e6ae2dc5a000c", label: "Op…}',
    'dateCreated': '2022-01-18T09:32:42Z',
    'customProperties': '{}',
    'contacts': '[]',
    'tags': '[]',
    'lastUpdated': '2022-01-18T13:35:10Z',
    'docs': '[]',
    'name': 'Amendment Test',
    'status': '{id: "2c91809d7e6adbbf017e6ae2dc7c0011", label: "Ac…}',
    'supplementaryDocs': '[]',
    'startDate': '2022-01-28',
    'endDate': '2022-01-02',
    'openEnded': true
  }],
  'orgs': '[]',
  'type': 'national',
  'alternateNames': '[]'
};

export {
  data,
  initialValues
};
