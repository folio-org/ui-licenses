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
    amendment: PropTypes.arrayOf(PropTypes.object),
  }

  renderBadge = () => {
    const { recordType } = this.props;
    let customProperties = false;
    if (recordType === 'license') {
      customProperties = this.props.license.customProperties;
    } else if (recordType === 'amendment') {
      customProperties = this.props.amendment.customProperties;
    }
    if (customProperties) {
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
