import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { IfInterface } from '@folio/stripes/core';
import {
  Accordion,
  Badge,
  FormattedUTCDate,
  InfoPopover,
  Layout,
  MultiColumnList,
  NoValue,
  Spinner,
} from '@folio/stripes/components';

const LicenseAgreements = ({
  amendment,
  id,
  license: { linkedAgreements },
  recordType,
  visibleColumns = [
    'linkNote',
    'name',
    'startDate',
    'endDate',
    'agreementStatus',
    'linkStatus',
  ]
}) => {
  const [groupedLinkedAgreements, setGroupedLinkedAgreements] = useState([]);

  useEffect(() => {
    if (
      !isEqual(new Set(linkedAgreements), new Set(groupedLinkedAgreements))
    ) {
      setGroupedLinkedAgreements([
        ...linkedAgreements.filter(a => a.status.value === 'controlling'),
        ...linkedAgreements.filter(a => a.status.value !== 'controlling'),
      ]);
    }
  }, [groupedLinkedAgreements, linkedAgreements]);

  const renderLinkedAgreements = () => {
    return (
      <MultiColumnList
        columnMapping={{
          linkNote: '',
          name: <FormattedMessage id="ui-licenses.prop.name" />,
          startDate: <FormattedMessage id="ui-licenses.prop.startDate" />,
          endDate: <FormattedMessage id="ui-licenses.prop.endDate" />,
          agreementStatus: <FormattedMessage id="ui-licenses.prop.agreementStatus" />,
          linkStatus: <FormattedMessage id="ui-licenses.prop.linkStatus" />,
          amendmentLinkStatus:  <FormattedMessage id="ui-licenses.prop.amendmentLinkStatus" />,
        }}
        columnWidths={{
          linkNote: 30,
          name: '30%',
          startDate: '15%',
          endDate: '15%',
          agreementStatus: '15%',
          linkStatus: '15%',
          amendmentLinkStatus: '15%'
        }}
        contentData={groupedLinkedAgreements}
        formatter={{
          linkNote: link => (link.note ? <InfoPopover content={link.note} /> : ''),
          // eslint-disable-next-line react/prop-types
          name: ({ owner:agreement = {} }) => <Link to={`/erm/agreements/${agreement.id}`}>{agreement.name}</Link>,
          // eslint-disable-next-line react/prop-types
          startDate: ({ owner:agreement = {} }) => (agreement.startDate ? <FormattedUTCDate value={agreement.startDate} /> : <NoValue />),
          // eslint-disable-next-line react/prop-types
          endDate: ({ owner:agreement = {} }) => (agreement.endDate ? <FormattedUTCDate value={agreement.endDate} /> : <NoValue />),
          // eslint-disable-next-line react/prop-types
          agreementStatus: ({ owner:agreement = {} }) => agreement?.agreementStatus?.label ?? <NoValue />,
          linkStatus: link => (link.status?.label ?? <NoValue />),
          amendmentLinkStatus: link => {
            const ammendmentLinked = link?.amendments?.find(a => a.amendmentId === amendment?.id);
            return (ammendmentLinked?.status?.label ?? <FormattedMessage id="ui-licenses.prop.unassigned" />);
          },
        }}
        id="linked-agreements-table"
        interactive={false}
        visibleColumns={visibleColumns}
      />
    );
  };

  const renderBadge = () => {
    const count = linkedAgreements.length;
    return count !== undefined ? <Badge>{count}</Badge> : <Spinner />;
  };

  return (
    <IfInterface name="erm">
      <Accordion
        displayWhenClosed={renderBadge()}
        displayWhenOpen={renderBadge()}
        id={id}
        label={recordType === 'license' ? <FormattedMessage id="ui-licenses.section.licenseAgreements" /> : <FormattedMessage id="ui-licenses.section.parentLicenseAgreements" />}
      >
        <Layout className="padding-bottom-gutter">
          { groupedLinkedAgreements.length ? renderLinkedAgreements() : <FormattedMessage id="ui-licenses.emptyAccordion.linkedAgreements" /> }
        </Layout>
      </Accordion>
    </IfInterface>
  );
};

LicenseAgreements.propTypes = {
  amendment:  PropTypes.shape({
    id: PropTypes.string,
  }),
  id: PropTypes.string,
  license: PropTypes.shape({
    id: PropTypes.string,
    linkedAgreements: PropTypes.arrayOf(PropTypes.shape({
      amendments: PropTypes.arrayOf(PropTypes.shape({
        amendmentId: PropTypes.string,
        status: PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      })),
      note: PropTypes.string,
      owner: PropTypes.shape({
        agreementStatus: PropTypes.shape({
          label: PropTypes.string,
        }),
        endDate: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        startDate: PropTypes.string,
      }),
      status: PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string,
      }).isRequired,
    })).isRequired,
  }).isRequired,
  recordType: PropTypes.oneOf(['amendment', 'license']).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string),
};


export default LicenseAgreements;
