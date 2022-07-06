const refdata = [
  {
    id: '2c91809d81d130250181d136fe2a0000',
    desc: 'DocumentAttachment.AtType',
    internal: false,
    values: [
      {
        id: '2c91809d81d130250181d136fe750001',
        value: 'consortium_authorization_statement',
        label: 'Consortium authorization statement'
      },
      {
        id: '2c91809d81d130250181d136fe810002',
        value: 'product_data_sheet',
        label: 'Product data sheet'
      },
      {
        id: '2c91809d81d130250181d136fe890003',
        value: 'vendor_terms_and_conditions',
        label: 'Vendor terms and conditions'
      }
    ]
  },
  {
    id: '2c91809d81d130250181d136ff56001b',
    desc: 'FileStorageEngines',
    internal: false,
    values: [
      {
        id: '2c91809d81d130250181d136ff5b001c',
        value: 'lob',
        label: 'LOB'
      },
      {
        id: '2c91809d81d130250181d136ff63001d',
        value: 's3',
        label: 'S3'
      }
    ]
  },
  {
    id: '2c91809d81d130250181d136fed50010',
    desc: 'InternalContact.Role',
    internal: false,
    values: [
      {
        id: '2c91809d81d130250181d136fedf0012',
        value: 'erm_librarian',
        label: 'ERM Librarian'
      },
      {
        id: '2c91809d81d130250181d136feed0014',
        value: 'negotiator',
        label: 'Negotiator'
      },
      {
        id: '2c91809d81d130250181d136fed80011',
        value: 'authorised_signatory',
        label: 'Authorised signatory'
      },
      {
        id: '2c91809d81d130250181d136fee60013',
        value: 'license_owner',
        label: 'License owner'
      },
      {
        id: '2c91809d81d130250181d136fef40015',
        value: 'subject_specialist',
        label: 'Subject specialist'
      }
    ]
  },
  {
    id: '2c91809d81d130250181d136fe8f0004',
    desc: 'License.EndDateSemantics',
    internal: true,
    values: [
      {
        id: '2c91809d81d130250181d136fea20007',
        value: 'implicit',
        label: 'Implicit'
      },
      {
        id: '2c91809d81d130250181d136fe930005',
        value: 'explicit',
        label: 'Explicit'
      },
      {
        id: '2c91809d81d130250181d136fe9a0006',
        value: 'open_ended',
        label: 'Open ended'
      }
    ]
  },
  {
    id: '2c91809d81d130250181d136fea70008',
    desc: 'License.Status',
    internal: true,
    values: [
      {
        id: '2c91809d81d130250181d136fec1000c',
        value: 'rejected',
        label: 'Rejected'
      },
      {
        id: '2c91809d81d130250181d136feb3000a',
        value: 'not_yet_active',
        label: 'Not yet active'
      },
      {
        id: '2c91809d81d130250181d136feba000b',
        value: 'active',
        label: 'Active'
      },
      {
        id: '2c91809d81d130250181d136feaa0009',
        value: 'in_negotiation',
        label: 'In negotiation'
      },
      {
        id: '2c91809d81d130250181d136fec7000d',
        value: 'expired',
        label: 'Expired'
      }
    ]
  },
  {
    id: '2c91809d81d130250181d136fefa0016',
    desc: 'License.Type',
    internal: false,
    values: [
      {
        id: '2c91809d81d130250181d136ff020018',
        value: 'consortial',
        label: 'Consortial'
      },
      {
        id: '2c91809d81d130250181d136ff070019',
        value: 'national',
        label: 'National'
      },
      {
        id: '2c91809d81d130250181d136ff0c001a',
        value: 'alliance',
        label: 'Alliance'
      },
      {
        id: '2c91809d81d130250181d136fefc0017',
        value: 'local',
        label: 'Local'
      }
    ]
  },
  {
    id: '2c91809d81d130250181d136fecc000e',
    desc: 'LicenseOrg.Role',
    internal: false,
    values: [
      {
        id: '2c91809d81d130250181d136fecf000f',
        value: 'licensor',
        label: 'Licensor'
      }
    ]
  },
  {
    id: '2c91809d81d130250181d13700840029',
    desc: 'Permitted/Prohibited',
    internal: false,
    values: [
      {
        id: '2c91809d81d130250181d13700aa002c',
        value: 'permitted_(interpreted)',
        label: 'Permitted (interpreted)'
      },
      {
        id: '2c91809d81d130250181d1370093002a',
        value: 'permitted_(explicit)',
        label: 'Permitted (explicit)'
      },
      {
        id: '2c91809d81d130250181d13700c70030',
        value: 'not_applicable',
        label: 'Not applicable'
      },
      {
        id: '2c91809d81d130250181d13700a2002b',
        value: 'permitted_(explicit)_under_conditions',
        label: 'Permitted (explicit) under conditions'
      },
      {
        id: '2c91809d81d130250181d13700bf002f',
        value: 'unmentioned',
        label: 'Unmentioned'
      },
      {
        id: '2c91809d81d130250181d13700b9002e',
        value: 'prohibited_(interpreted)',
        label: 'Prohibited (interpreted)'
      },
      {
        id: '2c91809d81d130250181d13700b3002d',
        value: 'prohibited_(explicit)',
        label: 'Prohibited (explicit)'
      }
    ]
  },
  {
    id: '2c91809d81d130250181d137006d0025',
    desc: 'Yes/No/Other',
    internal: false,
    values: [
      {
        id: '2c91809d81d130250181d13700780027',
        value: 'no',
        label: 'No'
      },
      {
        id: '2c91809d81d130250181d137007f0028',
        value: 'other_(see_notes)',
        label: 'Other (see notes)'
      },
      {
        id: '2c91809d81d130250181d13700710026',
        value: 'yes',
        label: 'Yes'
      }
    ]
  }
];

export default refdata;
