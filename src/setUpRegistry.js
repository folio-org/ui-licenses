import React from 'react';

import LicenseLookup from './LicenseLookup';

const setUpRegistry = (registry) => {
  // License Resource
  const licenseReg = registry.registerResource('license');
  licenseReg.addViewAll('/licenses');
  licenseReg.addViewTemplate(license => `/licenses/${license.id}`);

  // Lookup plugin
  licenseReg.addLookupComponent(LicenseLookup);
};

export default setUpRegistry;
