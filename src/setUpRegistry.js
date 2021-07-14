import { InternalContactsArrayDisplay } from '@folio/stripes-erm-components';

import LicenseLookup from './LicenseLookup';

const setUpRegistry = (registry) => {
  // License Resource
  const licenseReg = registry.registerResource('license');
  licenseReg.setViewResources('/licenses');
  licenseReg.setViewResource(license => `/licenses/${license.id}`);

  licenseReg.setRenderFunction('internalContacts', record => {
    return <InternalContactsArrayDisplay contacts={record.contacts} />;
  });

  // Lookup plugin
  licenseReg.addLookupComponent(LicenseLookup);
};

export default setUpRegistry;
