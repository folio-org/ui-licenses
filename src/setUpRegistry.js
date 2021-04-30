import React from 'react';

import RegistryLookup from './RegistryLookup';

const setUpRegistry = (registry) => {
  // License Resource
  const licenseReg = registry.registerResource('license');
  licenseReg.addViewAll('/licenses');
  licenseReg.addViewTemplate(license => `/licenses/${license.id}`);

  // Lookup plugin
  licenseReg.addLookupComponent(RegistryLookup);
};

export default setUpRegistry;
