import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { IntlConsumer, stripesConnect } from '@folio/stripes/core';
import { NoValue } from '@folio/stripes/components';

class PickListSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  suppressDelete = (category) => {
    const { internal, values = [] } = category;

    return internal || values.length;
  }

  render() {
    const { stripes } = this.props;

    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            actionSuppressor={{ edit: () => true, delete: this.suppressDelete }}
            baseUrl="licenses/refdata"
            columnMapping={{
              desc: intl.formatMessage({ id: 'ui-licenses.settings.pickList' }),
              actions: intl.formatMessage({ id: 'ui-licenses.settings.actions' }),
            }}
            formatter={{ numberOfObjects: (item) => item.values?.length ?? <NoValue /> }}
            hiddenFields={['lastUpdated']}
            id="pick-lists"
            itemTemplate={{ desc: this.desc, values: [] }}
            label={<FormattedMessage id="ui-licenses.settings.pickLists" />}
            labelSingular={intl.formatMessage({ id: 'ui-licenses.settings.pickList' })}
            limitParam="perPage"
            nameKey="desc"
            objectLabel={<FormattedMessage id="ui-licenses.settings.values" />}
            sortby="desc"
            stripes={stripes}
            visibleFields={['desc']}
          />
        )}
      </IntlConsumer>
    );
  }
}

export default stripesConnect(PickListSettings);
