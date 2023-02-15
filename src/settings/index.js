import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import { useStripes } from '@folio/stripes/core';
import { useSettings } from '@k-int/stripes-kint-components';

import {
  PickListSettings,
  PickListValueSettings,
} from './routes';

import {
  LicensesCustomProperties
} from './components';

import {
  REFDATA_ENDPOINT,
  SETTINGS_ENDPOINT
} from '../constants/endpoints';

const LicenseSettings = (props) => {
  const stripes = useStripes();
  const allowGlobalEdit = stripes.hasPerm('ui-licenses.appSettings.manage');
  const { isLoading, pageList, SettingsContextProvider } = useSettings({
    allowGlobalEdit,
    dynamicPageExclusions: ['registry'], // Registry AppSettings hold StringTemplating details etc -- not for user editing
    intlKey: 'ui-licenses',
    persistentPages: [],
    refdataEndpoint: REFDATA_ENDPOINT,
    settingEndpoint: SETTINGS_ENDPOINT
  });

  const sections = [
    {
      label: <FormattedMessage id="ui-licenses.settings.general" />,
      pages: [
        {
          component: LicensesCustomProperties,
          label: <FormattedMessage id="ui-licenses.section.terms" />,
          perm: 'settings.licenses.enabled',
          route: 'terms',
        },
      ]
    },
    {
      label: <FormattedMessage id="ui-licenses.settings.termPickList" />,
      pages: [
        {
          component: PickListSettings,
          label: <FormattedMessage id="ui-licenses.settings.pickLists" />,
          perm: 'settings.licenses.enabled',
          route: 'pick-lists',
        },
        {
          component: PickListValueSettings,
          label: <FormattedMessage id="ui-licenses.settings.pickListValues" />,
          perm: 'settings.licenses.enabled',
          route: 'pick-list-values',
        },
      ]
    },
    {
      label: <FormattedMessage id="ui-agreements.settings.appSettings" />,
      pages: pageList
    }
  ];

  if (isLoading) {
    return null;
  }

  return (
    <SettingsContextProvider>
      <Settings
        paneTitle={<FormattedMessage id="ui-licenses.meta.title" />}
        sections={sections}
        {...props}
      />
    </SettingsContextProvider>
  );
};

export default LicenseSettings;
