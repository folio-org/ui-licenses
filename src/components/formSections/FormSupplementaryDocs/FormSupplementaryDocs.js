import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import { Accordion } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';
import { DocumentsFieldArray, useFileHandlers } from '@folio/stripes-erm-components';

const FormSupplementaryDocs = ({ data, id, onToggle, open }) => {
  const stripes = useStripes();
  const { handleDownloadFile, handleUploadFile } = useFileHandlers('licenses/files');

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
        onDownloadFile={handleDownloadFile}
        onUploadFile={handleUploadFile}
      />
    </Accordion>
  );
};

FormSupplementaryDocs.propTypes = {
  data: PropTypes.shape({
    documentCategories: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  id: PropTypes.string,
  onToggle: PropTypes.func,
  open: PropTypes.bool
};

export default FormSupplementaryDocs;
