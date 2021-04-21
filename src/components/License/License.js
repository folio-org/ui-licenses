import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NotesSmartAccordion } from '@folio/stripes/smart-components';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  HasCommand,
  Icon,
  IconButton,
  LoadingPane,
  Pane,
  PaneMenu,
  Row,
  checkScope,
  collapseAllSections,
  expandAllSections
} from '@folio/stripes/components';
import { AppIcon, IfPermission, TitleManager, withStripes } from '@folio/stripes/core';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import DuplicateLicenseModal from '../DuplicateLicenseModal';

import {
  LicenseAgreements,
  LicenseAmendments,
  LicenseHeader,
  LicenseInfo,
  LicenseInternalContacts,
  LicenseOrganizations,
  CoreDocs,
  SupplementaryDocs,
  Terms,
} from '../viewSections';

class License extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      license: PropTypes.object,
      terms: PropTypes.arrayOf(PropTypes.object),
      users: PropTypes.arrayOf(PropTypes.object),
    }),
    handlers: PropTypes.shape({
      onClone: PropTypes.func.isRequired,
      onClose: PropTypes.func.isRequired,
      onDelete: PropTypes.func.isRequired,
      onEdit: PropTypes.func.isRequired,
      onToggleTags: PropTypes.func,
    }).isRequired,
    helperApp: PropTypes.node,
    isLoading: PropTypes.bool,
    urls: PropTypes.shape({
      edit: PropTypes.func,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func
    }),
  };

  constructor(props) {
    super(props);
    this.accordionStatusRef = React.createRef();
  }

  state = {
    showDeleteConfirmationModal: false,
    showDuplicateLicenseModal: false,
  }

  getSectionProps = (id) => {
    const { data, handlers, urls } = this.props;

    return {
      id,
      handlers,
      urls,
      license: data.license,
      record: data.license,
      recordType: 'license',
      terms: data.terms,
      users: data.users,
    };
  }

  openDeleteConfirmationModal = () => {
    this.setState({ showDeleteConfirmationModal: true });
  }

  closeDeleteConfirmationModal = () => {
    this.setState({ showDeleteConfirmationModal: false });
  }

  openDuplicateLicenseModal = () => {
    this.setState({ showDuplicateLicenseModal: true });
  }

  closeDuplicateLicenseModal = () => {
    this.setState({ showDuplicateLicenseModal: false });
  }

  getActionMenu = ({ onToggle }) => {
    const { stripes, urls } = this.props;
    // if (!urls.edit) return null;
    const buttons = [];

    if (stripes.hasPerm('ui-licenses.licenses.edit')) {
      buttons.push(
        <Button
          key="clickable-dropdown-edit-license"
          buttonStyle="dropdownItem"
          id="clickable-dropdown-edit-license"
          to={urls.edit()}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-licenses.edit" />
          </Icon>
        </Button>
      );
      buttons.push(
        <Button
          key="clickable-dropdown-duplicate-license"
          buttonStyle="dropdownItem"
          id="clickable-dropdown-duplicate-license"
          onClick={() => {
            this.openDuplicateLicenseModal();
            onToggle();
          }}
        >
          <Icon icon="duplicate">
            <FormattedMessage id="ui-licenses.licenses.duplicate" />
          </Icon>
        </Button>
      );
    }

    if (stripes.hasPerm('ui-licenses.licenses.delete')) {
      buttons.push(
        <Button
          key="clickable-dropdown-delete-licenses"
          buttonStyle="dropdownItem"
          id="clickable-dropdown-delete-licenses"
          onClick={() => {
            this.openDeleteConfirmationModal();
            onToggle();
          }}
        >
          <Icon icon="trash">
            <FormattedMessage id="ui-licenses.delete" />
          </Icon>
        </Button>
      );
    }

    return buttons.length ? buttons : null;
  }

  getInitialAccordionsState = () => {
    return {
      licenseInternalContacts: false,
      licenseOrganizations: false,
      licenseCoreDocs: false,
      licenseAmendments: false,
      licenseTerms: false,
      licenseSupplement: false,
      licenseAgreements: false,
      licenseNotes: false,
    };
  }

  renderLastMenu = () => {
    const {
      data: { license },
      handlers,
      stripes
    } = this.props;

    return stripes.hasPerm('ui-licenses.licenses.edit') ? (
      <PaneMenu>
        {handlers.onToggleTags &&
          <FormattedMessage id="ui-licenses.showTags">
            {ariaLabel => (
              <IconButton
                ariaLabel={ariaLabel}
                badgeCount={license?.tags?.length ?? 0}
                icon="tag"
                id="clickable-show-tags"
                onClick={handlers.onToggleTags}
              />
            )}
          </FormattedMessage>
        }
      </PaneMenu>
    ) : null;
  }

  render() {
    const { data, isLoading, handlers, helperApp } = this.props;

    const paneProps = {
      defaultWidth: '45%',
      dismissible: true,
      id: 'pane-view-license',
      onClose: handlers.onClose,
    };

    if (isLoading) return <LoadingPane {...paneProps} />;

    const shortcuts = [
      {
        name: 'edit',
        handler: handlers.onEdit,
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
        handler: () => {
          this.openDuplicateLicenseModal();
        }
      }
    ];

    return (
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <>
          <Pane
            actionMenu={this.getActionMenu}
            appIcon={<AppIcon app="licenses" />}
            lastMenu={this.renderLastMenu()}
            paneTitle={data.license.name}
            {...paneProps}
          >
            <TitleManager record={data.license.name}>
              <LicenseHeader {...this.getSectionProps()} />
              <LicenseInfo {...this.getSectionProps('licenseInfo')} />
              <AccordionStatus ref={this.accordionStatusRef}>
                <Row end="xs">
                  <Col xs>
                    <ExpandAllButton />
                  </Col>
                </Row>
                <AccordionSet initialStatus={this.getInitialAccordionsState()}>
                  { data.license?.contacts?.length > 0 && <LicenseInternalContacts {...this.getSectionProps('licenseInternalContacts')} /> }
                  { data.license?.orgs?.length > 0 && <LicenseOrganizations {...this.getSectionProps('licenseOrganizations')} /> }
                  { data.license?.docs?.length > 0 && <CoreDocs {...this.getSectionProps('licenseCoreDocs')} /> }
                  <Terms {...this.getSectionProps('licenseTerms')} />
                  <LicenseAmendments {...this.getSectionProps('licenseAmendments')} />
                  { data.license?.supplementaryDocs?.length > 0 && <SupplementaryDocs {...this.getSectionProps('licenseSupplement')} /> }
                  { data.license?.linkedAgreements?.length > 0 && <LicenseAgreements {...this.getSectionProps('licenseAgreements')} /> }
                  <NotesSmartAccordion
                    {...this.getSectionProps('licenseNotes')}
                    domainName="licenses"
                    entityId={data.license.id}
                    entityName={data.license.name}
                    entityType="license"
                    pathToNoteCreate="notes/create"
                    pathToNoteDetails="notes"
                  />
                </AccordionSet>
              </AccordionStatus>
            </TitleManager>
          </Pane>
          {helperApp}
          { this.state.showDuplicateLicenseModal &&
          <DuplicateLicenseModal
            onClone={(obj) => handlers.onClone(obj)}
            onClose={this.closeDuplicateLicenseModal}
          />
        }
          <ConfirmationModal
            buttonStyle="danger"
            confirmLabel={<FormattedMessage id="ui-licenses.delete" />}
            data-test-delete-confirmation-modal
            heading={<FormattedMessage id="ui-licenses.deleteLicense" />}
            id="delete-agreement-confirmation"
            message={<SafeHTMLMessage id="ui-licenses.delete.confirmMessage" values={{ name: data.license?.name }} />}
            onCancel={this.closeDeleteConfirmationModal}
            onConfirm={() => {
              handlers.onDelete();
              this.closeDeleteConfirmationModal();
            }}
            open={this.state.showDeleteConfirmationModal}
          />
        </>
      </HasCommand>
    );
  }
}

export default withStripes(License);
