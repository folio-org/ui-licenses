
import { FormattedMessage, useIntl } from 'react-intl';

import { useQuery, useQueryClient } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { CustomPropertiesSettings } from '@k-int/stripes-kint-components';

import { REFDATA_ENDPOINT, CUSTPROP_ENDPOINT } from '../../constants/endpoints';

const LicensesCustomProperties = () => {
  const intl = useIntl();
  const ky = useOkapiKy();

  const queryClient = useQueryClient();

  const { data: custpropContexts = [] } = useQuery(
    ['ui-licenses', 'settings', 'custpropContexts'],
    () => ky('licenses/custprops/contexts').json()
  );

  const contexts = [
    {
      value: '',
      label: intl.formatMessage({ id: 'ui-licenses.terms.all' })
    },
    ...custpropContexts?.map(cpc => (
      {
        value: cpc,
        label: cpc
      })),
    {
      value: 'isNull',
      label: intl.formatMessage({ id: 'ui-licenses.terms.none' })
    }
  ];

  const labelOverrides = {
    paneTitle: <FormattedMessage id="ui-licenses.terms" />,
    primary: <FormattedMessage id="ui-licenses.terms.primary" />
  };

  const helpPopovers = {
    name: <FormattedMessage id="ui-licenses.terms.help.name" />,
    label: <FormattedMessage id="ui-licenses.terms.help.label" />
  };

  return (
    <CustomPropertiesSettings
      afterQueryCalls={{
        put: () => queryClient.invalidateQueries(['ui-licenses', 'settings', 'custpropContexts']),
        post: () => queryClient.invalidateQueries(['ui-licenses', 'settings', 'custpropContexts']),
        delete: () => queryClient.invalidateQueries(['ui-licenses', 'settings', 'custpropContexts'])
      }}
      contextFilterOptions={contexts}
      customPropertiesEndpoint={CUSTPROP_ENDPOINT}
      helpPopovers={helpPopovers}
      labelOverrides={labelOverrides}
      refdataEndpoint={REFDATA_ENDPOINT}
    />
  );
};

export default LicensesCustomProperties;
