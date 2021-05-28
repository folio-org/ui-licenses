import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion, Badge, Spinner } from '@folio/stripes/components';
import { CustomPropertiesList } from '@folio/stripes-erm-components';

export default class Terms extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    record: PropTypes.shape({ customProperties: PropTypes.object }),
    recordType: PropTypes.string.isRequired,
    terms: PropTypes.arrayOf(PropTypes.object),
    license: PropTypes.arrayOf(PropTypes.object),
  }

  renderBadge = () => {
    const { license: { customProperties } } = this.props;
    if (customProperties !== undefined) {
      const count = Object.keys(customProperties).length;
      return <Badge>{count}</Badge>;
    } else {
      return <Spinner />;
    }
  }

  render() {
    const { id, record, recordType, terms } = this.props;

    return (
      <FormattedMessage id={`ui-licenses.${recordType}`}>
        {([type]) => (
          <Accordion
            displayWhenClosed={this.renderBadge()}
            id={id}
            label={<FormattedMessage id="ui-licenses.section.terms" />}
          >
            <CustomPropertiesList
              customProperties={terms}
              isEmptyMessage={<FormattedMessage id="ui-licenses.emptyAccordion.terms" values={{ type: type.toLowerCase() }} />}
              resource={record}
            />
          </Accordion>
        )}
      </FormattedMessage>
    );
  }
}
