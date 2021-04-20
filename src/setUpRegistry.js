import React from 'react';

import Registry from '@folio/plugin-resource-registry';

import RegistryLookup from './RegistryLookup';

const setUpRegistry = () => {
  const registry = Registry;
  // License Resource
  const licenseReg = registry.registerResource('license');
  licenseReg.addViewAll('/licenses');
  licenseReg.addViewTemplate(license => `/licenses/${license.id}`);

  // Lookup plugin
  licenseReg.addLookupComponent(RegistryLookup);
};

export default setUpRegistry;
