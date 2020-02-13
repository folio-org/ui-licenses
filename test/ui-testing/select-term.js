const Term = require('./term');

module.exports.test = (uiTestCtx) => {
  Term.test(
    uiTestCtx,
    {
      name: 'authSAML',
      label: 'SAML compliant authentication supported?',
      value: 'No',
      editedValue: 'Yes',
      note: 'Internal note',
      publicNote: 'Public note',
      internal: {
        text: 'Public',
        value: 'false',
      }
    },
  );
};
