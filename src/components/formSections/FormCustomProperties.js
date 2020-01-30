import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion } from '@folio/stripes/components';

import { FormTerms } from '@folio/stripes-erm-components';

class FormCustomProperties extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  render() {
    const { data, id, onToggle, open } = this.props;
    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-licenses.section.terms" />}
        open={open}
        onToggle={onToggle}
      >
        <FormTerms
          data={data}
          optionalSectionLabel={<FormattedMessage id="ui-licenses.terms.optionalTerms" />}
          primarySectionLabel={<FormattedMessage id="ui-licenses.terms.primaryTerms" />}
        />
      </Accordion>
    );
  }
}

export default FormCustomProperties;
