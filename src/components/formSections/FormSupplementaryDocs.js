import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import { Accordion } from '@folio/stripes/components';
import { withStripes } from '@folio/stripes/core';
import { DocumentsFieldArray } from '@folio/stripes-erm-components';

class FormSupplementaryDocs extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      documentCategories: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    handlers: PropTypes.shape({
      onDownloadFile: PropTypes.func.isRequired,
      onUploadFile: PropTypes.func.isRequired,
    }).isRequired,
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    stripes: PropTypes.object
  };

  render() {
    const { data, handlers, id, onToggle, open, stripes } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-licenses.section.supplementaryDocuments" />}
        onToggle={onToggle}
        open={open}
      >
        <FieldArray
          addDocBtnLabel={<FormattedMessage id="ui-licenses.supplementaryDocs.add" />}
          component={DocumentsFieldArray}
          deleteBtnTooltipMsgId="ui-licenses.supplementaryDocs.remove"
          documentCategories={data.documentCategories}
          hasDownloadPerm={stripes.hasPerm('ui-licenses.licenses.file.download')}
          isEmptyMessage={<FormattedMessage id="ui-licenses.supplementaryDocs.none" />}
          name="supplementaryDocs"
          onDownloadFile={handlers.onDownloadFile}
          onUploadFile={handlers.onUploadFile}
        />
      </Accordion>
    );
  }
}

export default withStripes(FormSupplementaryDocs);
