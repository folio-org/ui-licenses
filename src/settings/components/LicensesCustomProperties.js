
import { FormattedMessage, useIntl } from 'react-intl';

import { useQueryClient } from 'react-query';
import { useStripes } from '@folio/stripes/core';
import { CustomPropertiesSettings } from '@k-int/stripes-kint-components';

import { REFDATA_ENDPOINT, CUSTPROP_ENDPOINT } from '../../constants';
import { useLicensesContexts } from '../../hooks';

const LicensesCustomProperties = () => {
  const intl = useIntl();

  const queryClient = useQueryClient();

  const { data: custpropContexts = [] } = useLicensesContexts();

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

  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-licenses.terms.manage');
  const displayConditions = {
    create: perm,
    delete: perm,
    edit: perm
  };

  const helpPopovers = {
    name: <FormattedMessage id="ui-licenses.terms.help.name" />,
    label: <FormattedMessage id="ui-licenses.terms.help.label" />,
    ctx: <FormattedMessage id="ui-licenses.terms.help.category" />
  };

  return (
    <CustomPropertiesSettings
      afterQueryCalls={{
        put: () => queryClient.invalidateQueries([`${CUSTPROP_ENDPOINT}/contexts`]),
        post: () => queryClient.invalidateQueries([`${CUSTPROP_ENDPOINT}/contexts`]),
        delete: () => queryClient.invalidateQueries([`${CUSTPROP_ENDPOINT}/contexts`])
      }}
      contextFilterOptions={contexts}
      customPropertiesEndpoint={CUSTPROP_ENDPOINT}
      displayConditions={displayConditions}
      helpPopovers={helpPopovers}
      refdataEndpoint={REFDATA_ENDPOINT}
    />
  );
};

export default LicensesCustomProperties;
