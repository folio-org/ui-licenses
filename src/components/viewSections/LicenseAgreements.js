import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
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

export default class LicenseAgreements extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    visibleColumns: [
      'linkNote',
      'name',
      'startDate',
      'endDate',
      'agreementStatus',
      'linkStatus',
    ],
  }

  state = {
    groupedLinkedAgreements: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { license: { id, linkedAgreements } } = props;

    if (
      (id !== state.groupedLinkedAgreements.remoteId) ||
      (linkedAgreements.length !== state.groupedLinkedAgreements.length) ||
      (get(linkedAgreements, [0, 'owner', 'id']) !== get(state.groupedLinkedAgreements, [0, 'owner', 'id']))
    ) {
      return {
        groupedLinkedAgreements: [
          ...linkedAgreements.filter(a => a.status.value === 'controlling'),
          ...linkedAgreements.filter(a => a.status.value !== 'controlling'),
        ]
      };
    }

    return null;
  }

  renderLinkedAgreements = () => {
    const { visibleColumns } = this.props;
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
        contentData={this.state.groupedLinkedAgreements}
        formatter={{
          linkNote: link => (link.note ? <InfoPopover content={link.note} /> : ''),
          name: ({ owner:agreement = {} }) => <Link to={`/erm/agreements/${agreement.id}`}>{agreement.name}</Link>,
          startDate: ({ owner:agreement = {} }) => (agreement.startDate ? <FormattedUTCDate value={agreement.startDate} /> : <NoValue />),
          endDate: ({ owner:agreement = {} }) => (agreement.endDate ? <FormattedUTCDate value={agreement.endDate} /> : <NoValue />),
          agreementStatus: ({ owner:agreement = {} }) => agreement?.agreementStatus?.label ?? <NoValue />,
          linkStatus: link => (link.status?.label ?? <NoValue />),
          amendmentLinkStatus: link => {
            const ammendmentLinked = link?.amendments?.find(a => a.amendmentId === this.props.amendment?.id);
            return (ammendmentLinked?.status?.label ?? <FormattedMessage id="ui-licenses.prop.unassigned" />);
          },
        }}
        id="linked-agreements-table"
        interactive={false}
        visibleColumns={visibleColumns}
      />
    );
  }

  renderBadge = () => {
    const count = this.props.license.linkedAgreements.length;
    return count !== undefined ? <Badge>{count}</Badge> : <Spinner />;
  }

  render() {
    const { id, recordType } = this.props;

    return (
      <IfInterface name="erm">
        <Accordion
          displayWhenClosed={this.renderBadge()}
          displayWhenOpen={this.renderBadge()}
          id={id}
          label={recordType === 'license' ? <FormattedMessage id="ui-licenses.section.licenseAgreements" /> : <FormattedMessage id="ui-licenses.section.parentLicenseAgreements" />}
        >
          <Layout className="padding-bottom-gutter">
            { this.state.groupedLinkedAgreements.length ? this.renderLinkedAgreements() : <FormattedMessage id="ui-licenses.emptyAccordion.linkedAgreements" /> }
          </Layout>
        </Accordion>
      </IfInterface>
    );
  }
}
