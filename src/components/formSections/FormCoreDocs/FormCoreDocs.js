import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import { Accordion } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';

import { DocumentsFieldArray, useFileHandlers } from '@folio/stripes-erm-components';

const FormCoreDocs = ({ id, onToggle, open }) => {
  const stripes = useStripes();
  const { handleDownloadFile, handleUploadFile } = useFileHandlers('licenses/files');

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
        onDownloadFile={handleDownloadFile}
        onUploadFile={handleUploadFile}
      />
    </Accordion>
  );
};

FormCoreDocs.propTypes = {
  id: PropTypes.string,
  onToggle: PropTypes.func,
  open: PropTypes.bool
};

export default FormCoreDocs;
