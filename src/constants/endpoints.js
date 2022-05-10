export const REFDATA_ENDPOINT = 'licenses/refdata';
export const CUSTPROP_ENDPOINT = 'licenses/custprops';
export const SETTINGS_ENDPOINT = 'licenses/settings/appSettings';

export const LICENSES_ENDPOINT = 'licenses/licenses';
export const LICENSE_ENDPOINT = (id) => `${LICENSES_ENDPOINT}/${id}`;
export const AMENDMENT_ENDPOINT = (id) => `licenses/amendments/${id}`;
export const LINKED_AGREEMENTS_ENDPOINT = (licenseId) => `${LICENSE_ENDPOINT(licenseId)}/linkedAgreements`;
