import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ExpandAllButton,
  HasCommand,
  Icon,
  LoadingPane,
  Pane,
  Row,
  checkScope,
  collapseAllSections,
  expandAllSections
} from '@folio/stripes/components';

import { AppIcon, TitleManager } from '@folio/stripes/core';

import {
  AmendmentInfo,
  AmendmentLicense,
  CoreDocs,
  LicenseAgreements,
  SupplementaryDocs,
  Terms,
} from '../viewSections';

export default class Amendment extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      amendment: PropTypes.shape({
        docs: PropTypes.arrayOf(PropTypes.object),
        id: PropTypes.string,
        linkedAgreements: PropTypes.array,
        name: PropTypes.string,
        status: PropTypes.shape({
          label: PropTypes.string,
        }),
        supplementaryDocs: PropTypes.arrayOf(PropTypes.object),
      }).isRequired,
      license: PropTypes.object.isRequired,
      terms: PropTypes.arrayOf(PropTypes.object),
    }),
    handlers: PropTypes.shape({
      onClone: PropTypes.func,
      onClose: PropTypes.func.isRequired,
      onDelete: PropTypes.func,
      onEditAmendment: PropTypes.func.isRequired
    }),
    isLoading: PropTypes.bool,
    urls: PropTypes.shape({
      editAmendment: PropTypes.func,
    }),
  }

  constructor(props) {
    super(props);
    this.accordionStatusRef = React.createRef();
  }

  getSectionProps = (id) => {
    const { data, handlers, urls } = this.props;

    return {
      amendment: data.amendment,
      id,
      handlers,
      license: data.license,
      record: data.amendment,
      recordType: 'amendment',
      terms: data.terms,
      urls,
    };
  }

  getInitialAccordionsState = () => {
    return {
      amendmentCoreDocs: false,
      amendmentSupplementaryDocs: false,
      amendmentTerms: false,
      licenseAgreements: false,
    };
  }

  renderActionMenu = ({ onToggle }) => {
    const { data: { amendment: { id: amendmentId } }, handlers, urls } = this.props;

    if (!urls.editAmendment && !handlers.onDelete) return null;

    return (
      <>
        {urls.editAmendment &&
          <>
            <Button
              buttonStyle="dropdownItem"
              id="clickable-dropdown-edit-amendment"
              to={urls.editAmendment(amendmentId)}
            >
              <Icon icon="edit">
                <FormattedMessage id="ui-licenses.edit" />
              </Icon>
            </Button>
            <Button
              buttonStyle="dropdownItem"
              id="clickable-dropdown-duplicate-amendment"
              onClick={() => {
                handlers.onClone();
              }}
            >
              <Icon icon="duplicate">
                <FormattedMessage id="ui-licenses.licenses.duplicate" />
              </Icon>
            </Button>
          </>
        }
        {handlers.onDelete &&
          <Button
            buttonStyle="dropdownItem"
            id="clickable-delete-amendment"
            onClick={() => {
              handlers.onDelete();
              onToggle();
            }}
          >
            <Icon icon="trash">
              <FormattedMessage id="ui-licenses.delete" />
            </Icon>
          </Button>
        }
      </>
    );
  }

  render() {
    const {
      data: { amendment, license },
      handlers: { onClone, onClose, onEditAmendment },
      isLoading,
    } = this.props;

    const paneProps = {
      defaultWidth: '45%',
      dismissible: true,
      id: 'pane-view-amendment',
      onClose,
    };

    if (isLoading) return <LoadingPane {...paneProps} />;

    const shortcuts = [
      {
        name: 'edit',
        handler: () => onEditAmendment(amendment.id),
      },
      {
        name: 'expandAllSections',
        handler: (e) => expandAllSections(e, this.accordionStatusRef),
      },
      {
        name: 'collapseAllSections',
        handler: (e) => collapseAllSections(e, this.accordionStatusRef)
      },
      {
        name: 'duplicateRecord',
        handler: () => onClone(amendment.id)
      }
    ];

    return (
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <Pane
          actionMenu={this.renderActionMenu}
          appIcon={<AppIcon app="licenses" iconKey="amendment" />}
          paneTitle={<FormattedMessage id="ui-licenses.amendments.view.paneTitle" values={{ name: amendment.name }} />}
          {...paneProps}
        >
          <TitleManager record={amendment.name}>
            <AmendmentInfo {...this.getSectionProps()} />
            <AmendmentLicense {...this.getSectionProps()} />
            <AccordionStatus ref={this.accordionStatusRef}>
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet initialStatus={this.getInitialAccordionsState()}>
                { amendment?.docs?.length > 0 && <CoreDocs {...this.getSectionProps('amendmentCoreDocs')} /> }
                <Terms {...this.getSectionProps('amendmentTerms')} />
                { amendment?.supplementaryDocs?.length > 0 && <SupplementaryDocs {...this.getSectionProps('amendmentSupplementaryDocs')} /> }
                { license?.linkedAgreements?.length > 0 && <LicenseAgreements {...this.getSectionProps('licenseAgreements')} /> }
              </AccordionSet>
            </AccordionStatus>
          </TitleManager>
        </Pane>
      </HasCommand>
    );
  }
}
