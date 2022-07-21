const activeFilters = {
  'status': [
    'active'
  ],
  'type': [
    'alliance'
  ],
  'org': [
    'd74c1e27-70cd-45c1-b4d9-b0a9f392052d'
  ]
};

const data = {
  'licenses': '[]',
  'statusValues': [
    {
      'id': '2c91809d821bd92801821bdfdde10018',
      'value': 'active',
      'label': 'Active'
    },
    {
      'id': '2c91809d821bd92801821bdfddf0001a',
      'value': 'expired',
      'label': 'Expired'
    },
    {
      'id': '2c91809d821bd92801821bdfddd30016',
      'value': 'in_negotiation',
      'label': 'In negotiation'
    },
    {
      'id': '2c91809d821bd92801821bdfddd90017',
      'value': 'not_yet_active',
      'label': 'Not yet active'
    },
    {
      'id': '2c91809d821bd92801821bdfdde90019',
      'value': 'rejected',
      'label': 'Rejected'
    }
  ],
  'typeValues': [
    {
      'id': '2c91809d821bd92801821bdfddaf0010',
      'value': 'alliance',
      'label': 'Alliance'
    },
    {
      'id': '2c91809d821bd92801821bdfdd9f000e',
      'value': 'consortial',
      'label': 'Consortial'
    },
    {
      'id': '2c91809d821bd92801821bdfdd95000d',
      'value': 'local',
      'label': 'Local'
    },
    {
      'id': '2c91809d821bd92801821bdfdda8000f',
      'value': 'national',
      'label': 'National'
    }
  ],
  'orgRoleValues': [
    {
      'id': '2c91809d821bd92801821bdfdd8a000b',
      'value': 'licensor',
      'label': 'Licensor'
    }
  ],
  'tags': [
    {
      'id': '2833771c-f07a-4492-90ad-ff80896357e3',
      'label': 'important',
      'metadata': '{createdDate: "2022-07-20T13:50:14.224+00:00"}'
    },
    {
      'id': '56fd260c-725c-4c83-8767-71b896f3693a',
      'label': 'urgent',
      'description': 'Requires urgent attention',
      'metadata': '{createdDate: "2022-07-20T13:50:14.230+00:00"}'
    }
  ]
};


export { activeFilters, data };
