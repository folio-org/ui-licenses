import { InternalContactsArrayDisplay, OrganizationsArrayDisplay } from '@folio/stripes-erm-components';

import LicenseLookup from './LicenseLookup';

const setUpRegistry = (registry) => {
  // License Resource
  const licenseReg = registry.registerResource('license');
  licenseReg.setViewResources('/licenses');
  licenseReg.setViewResource(license => `/licenses/${license.id}`);

  licenseReg.setRenderFunction('internalContacts', record => {
    return <InternalContactsArrayDisplay contacts={record.contacts} />;
  });

  licenseReg.setRenderFunction('orgs', record => {
    return <OrganizationsArrayDisplay orgs={record.orgs} />;
  });

  // Lookup plugin
  licenseReg.setLookupComponent(LicenseLookup);
};

export default setUpRegistry;
