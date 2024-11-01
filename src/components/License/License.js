import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { NotesSmartAccordion } from '@folio/stripes/smart-components';
import { CustomPropertiesView } from '@k-int/stripes-kint-components';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  HasCommand,
  Icon,
  LoadingPane,
  Pane,
  PaneMenu,
  Row,
  checkScope,
  collapseAllSections,
  expandAllSections
} from '@folio/stripes/components';
import { AppIcon, TitleManager, useStripes } from '@folio/stripes/core';

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
} from '../viewSections';

import { useLicensesContexts } from '../../hooks';
import { CUSTPROP_ENDPOINT } from '../../constants';

const License = ({
  components: {
    HelperComponent,
    TagButton,
  },
  data,
  handlers,
  isLoading,
  urls,
}) => {
  const accordionStatusRef = useRef();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [showDuplicateLicenseModal, setShowDuplicateLicenseModal] = useState(false);

  const stripes = useStripes();

  const { data: custpropContexts = [] } = useLicensesContexts();
  // Ensure the custprops with no contexts get rendered
  const contexts = ['isNull', ...custpropContexts];

  const getSectionProps = (id) => {
    return {
      id,
      handlers,
      urls,
      license: data.license,
      record: data.license,
      recordType: 'license',
      users: data.users,
    };
  };

  const getActionMenu = ({ onToggle }) => {
    const buttons = [];

    if (stripes.hasPerm('ui-licenses.licenses.edit')) {
      if (!urls.edit) return null;
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
            setShowDuplicateLicenseModal(true);
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
            setShowDeleteConfirmationModal(true);
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
  };

  const getInitialAccordionsState = () => {
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
  };

  const renderLastMenu = () => {
    const { license } = data;

    return stripes.hasPerm('ui-licenses.licenses.edit') ? (
      <PaneMenu>
        {handlers.onToggleTags &&
          <TagButton
            entity={license}
          />
        }
      </PaneMenu>
    ) : null;
  };

  const paneProps = {
    defaultWidth: '45%',
    dismissible: true,
    id: 'pane-view-license',
    onClose: handlers.onClose,
  };

  if (isLoading) return <LoadingPane {...paneProps} />;

  // istanbul ignore next
  const shortcuts = [
    {
      name: 'edit',
      // TODO we have two different method calls for the same action
      handler: handlers.onEdit,
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef)
    },
    {
      name: 'duplicateRecord',
      handler: () => {
        setShowDuplicateLicenseModal(true);
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
          actionMenu={getActionMenu}
          appIcon={<AppIcon app="licenses" />}
          lastMenu={renderLastMenu()}
          paneTitle={data.license.name}
          {...paneProps}
        >
          <TitleManager record={data.license.name}>
            <LicenseHeader {...getSectionProps()} />
            <LicenseInfo {...getSectionProps('licenseInfo')} />
            <AccordionStatus ref={accordionStatusRef}>
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet initialStatus={getInitialAccordionsState()}>
                {data.license?.contacts?.length > 0 && <LicenseInternalContacts {...getSectionProps('licenseInternalContacts')} />}
                {data.license?.orgs?.length > 0 && <LicenseOrganizations {...getSectionProps('licenseOrganizations')} />}
                {data.license?.docs?.length > 0 && <CoreDocs {...getSectionProps('licenseCoreDocs')} />}
                <CustomPropertiesView
                  contexts={contexts}
                  customProperties={data.license.customProperties}
                  customPropertiesEndpoint={CUSTPROP_ENDPOINT}
                  id="terms"
                />
                <LicenseAmendments {...getSectionProps('licenseAmendments')} />
                {data.license?.supplementaryDocs?.length > 0 && <SupplementaryDocs {...getSectionProps('licenseSupplement')} />}
                {data.license?.linkedAgreements?.length > 0 && <LicenseAgreements {...getSectionProps('licenseAgreements')} />}
                {
                  data.license?.id && <NotesSmartAccordion
                    {...getSectionProps('licenseNotes')}
                    domainName="licenses"
                    entityId={data.license.id}
                    entityName={data.license.name}
                    entityType="license"
                    pathToNoteCreate="notes/create"
                    pathToNoteDetails="notes"
                  />
                }
              </AccordionSet>
            </AccordionStatus>
          </TitleManager>
        </Pane>
        <HelperComponent
          link={data.tagsLink}
          onToggle={handlers.onToggleTags}
        />
        {showDuplicateLicenseModal &&
          <DuplicateLicenseModal
            onClone={(obj) => handlers.onClone(obj)}
            onClose={() => setShowDuplicateLicenseModal(false)}
          />
        }
        <ConfirmationModal
          buttonStyle="danger"
          confirmLabel={<FormattedMessage id="ui-licenses.delete" />}
          data-test-delete-confirmation-modal
          heading={<FormattedMessage id="ui-licenses.deleteLicense" />}
          id="delete-agreement-confirmation"
          message={<FormattedMessage id="ui-licenses.delete.confirmMessage" values={{ name: data.license?.name }} />}
          onCancel={() => setShowDeleteConfirmationModal(false)}
          onConfirm={() => {
            handlers.onDelete();
            setShowDeleteConfirmationModal(false);
          }}
          open={showDeleteConfirmationModal}
        />
      </>
    </HasCommand>
  );
};

License.propTypes = {
  components: PropTypes.object,
  data: PropTypes.shape({
    license: PropTypes.object,
    tagsLink: PropTypes.string,
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

export default License;
