import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import { Accordion } from '@folio/stripes/components';
import { withStripes } from '@folio/stripes/core';

import { DocumentsFieldArray } from '@folio/stripes-erm-components';

class FormCoreDocs extends React.Component {
  static propTypes = {
    handlers: PropTypes.shape({
      onDownloadFile: PropTypes.func.isRequired,
      onUploadFile: PropTypes.func.isRequired,
    }),
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    stripes: PropTypes.object
  };

  render() {
    const { handlers, id, onToggle, open, stripes } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-licenses.section.coreDocs" />}
        onToggle={onToggle}
        open={open}
      >
        <FieldArray
          addDocBtnLabel={<FormattedMessage id="ui-licenses.coreDocs.add" />}
          component={DocumentsFieldArray}
          deleteBtnTooltipMsgId="ui-licenses.coreDocs.removeCoreDoc"
          hasDownloadPerm={stripes.hasPerm('ui-licenses.licenses.file.download')}
          isEmptyMessage={<FormattedMessage id="ui-licenses.coreDocs.none" />}
          name="docs"
          onDownloadFile={handlers.onDownloadFile}
          onUploadFile={handlers.onUploadFile}
        />
      </Accordion>
    );
  }
}

export default withStripes(FormCoreDocs);
