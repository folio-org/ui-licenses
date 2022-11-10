import { translationsProperties as coreTranslations } from '@folio/stripes-erm-testing';

import translations from '../../translations/ui-licenses/en';

const translationsProperties = [
  {
    prefix: 'ui-licenses',
    translations,
  },
  ...coreTranslations
];

export default translationsProperties;
