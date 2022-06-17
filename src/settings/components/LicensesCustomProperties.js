
import { FormattedMessage, useIntl } from 'react-intl';

import { useQueryClient } from 'react-query';

import { CustomPropertiesSettings } from '@k-int/stripes-kint-components';

import { REFDATA_ENDPOINT, CUSTPROP_ENDPOINT } from '../../constants/endpoints';
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

  const labelOverrides = {
    modalTitleEdit: <FormattedMessage id="ui-licenses.term.editModal" />,
    modalTitleNew: <FormattedMessage id="ui-licenses.term.newModal" />,
    paneTitle: <FormattedMessage id="ui-licenses.terms" />,
    primary: <FormattedMessage id="ui-licenses.terms.primary" />,
    retired: <FormattedMessage id="ui-licenses.terms.retired" />,
    primaryRetired: <FormattedMessage id="ui-licenses.terms.primaryRetired" />,
    ctx: <FormattedMessage id="ui-licenses.terms.category" />,
    category: <FormattedMessage id="ui-licenses.terms.pickList" />,
    deleteError: (error, custProp) => (<FormattedMessage id="ui-licenses.terms.deleteError" values={{ label: custProp?.label, error }} />)
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
      helpPopovers={helpPopovers}
      labelOverrides={labelOverrides}
      refdataEndpoint={REFDATA_ENDPOINT}
    />
  );
};

export default LicensesCustomProperties;
