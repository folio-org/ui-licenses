import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  Badge,
  Button,
  FormattedUTCDate,
  MultiColumnList,
} from '@folio/stripes/components';

import { LicenseEndDate } from '@folio/stripes-erm-components';

const propTypes = {
  license: PropTypes.shape({
    amendments: PropTypes.arrayOf(PropTypes.object),
  }),
  handlers: PropTypes.shape({
    onAmendmentClick: PropTypes.func,
  }),
  id: PropTypes.string,
  licenseAmendmentsAccordionLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  urls: PropTypes.shape({
    addAmendment: PropTypes.func,
    viewAmendment: PropTypes.func.isRequired,
  }).isRequired
};

export default function LicenseAmendments({
  license,
  handlers: { onAmendmentClick },
  id,
  licenseAmendmentsAccordionLabel,
  urls
}) {
  const onRowClick = (_, row) => {
    onAmendmentClick(row.id);
  };

  const renderBadge = () => {
    const count = license?.amendments?.length;
    return <Badge>{count}</Badge>;
  };

  const renderAddAmendmentButton = () => {
    if (!urls.addAmendment) return renderBadge();

    return (
      <Button id="add-amendment-button" to={urls.addAmendment()}>
        <FormattedMessage id="ui-licenses.amendments.add" />
      </Button>
    );
  };

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderAddAmendmentButton()}
        id={id}
        label={<FormattedMessage id="ui-licenses.section.amendments" />}
      >
        <MultiColumnList
          columnMapping={{
            name: <FormattedMessage id="ui-licenses.prop.name" />,
            status: <FormattedMessage id="ui-licenses.prop.status" />,
            startDate: <FormattedMessage id="ui-licenses.prop.startDate" />,
            endDate: <FormattedMessage id="ui-licenses.prop.endDate" />,
          }}
          columnWidths={{
            name: '50%',
            status: '15%',
            startDate: '15%',
            endDate: '15%',
          }}
          contentData={license.amendments || []}
          formatter={{
            name: a => a.name,
            status: a => a?.status?.label,
            startDate: a => (a.startDate ? <FormattedUTCDate value={a.startDate} /> : null),
            endDate: a => <LicenseEndDate license={a} renderNullIfEmpty/>,
          }}
          id="amendments-table"
          isEmptyMessage={<FormattedMessage id="ui-licenses.emptyAccordion.amendments" />}
          onRowClick={this.onRowClick}
          visibleColumns={[
            'name',
            'status',
            'startDate',
            'endDate'
          ]}
        />
      </Accordion>
    );
  }
}

LicenseAmendments.propTypes = propTypes;
LicenseAmendments.defaultProps = {
  licenseAmendmentsAccordionLabel: <FormattedMessage id="ui-licenses.section.amendments" />
};
