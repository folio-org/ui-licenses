import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  Badge,
  Layout,
  Spinner,
} from '@folio/stripes/components';
import { DocumentCard, useFileHandlers } from '@folio/stripes-erm-components';
import { useStripes } from '@folio/stripes/core';

const CoreDocs = ({
  id,
  record: {
    docs
  },
  recordType
}) => {
  const stripes = useStripes();
  const { handleDownloadFile } = useFileHandlers('licenses/files');

  const renderDocs = () => {
    return docs?.map(doc => (
      <DocumentCard
        key={doc.id}
        hasDownloadPerm={stripes.hasPerm('ui-licenses.licenses.file.download')}
        hideCategory
        onDownloadFile={handleDownloadFile}
        {...doc}
      />
    ));
  };

  const renderBadge = () => {
    const count = docs?.length;
    return count !== undefined ? <Badge>{count}</Badge> : <Spinner />;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      id={id}
      label={<FormattedMessage id="ui-licenses.section.coreDocs" />}
    >
      <Layout className="padding-bottom-gutter">
        { docs?.length ?
          renderDocs() :
          <FormattedMessage
            id={`ui-licenses.emptyAccordion.coreDocuments.${recordType}`}
          />
        }
      </Layout>
    </Accordion>
  );
};

CoreDocs.propTypes = {
  id: PropTypes.string,
  record: PropTypes.shape({
    docs: PropTypes.arrayOf(
      PropTypes.shape({
        dateCreated: PropTypes.string,
        lastUpdated: PropTypes.string,
        location: PropTypes.string,
        name: PropTypes.string.isRequired,
        note: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
  recordType: PropTypes.string.isRequired
};

export default CoreDocs;
