import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { CustomPropertiesView } from '@k-int/stripes-kint-components';

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
  AccessControl,
  AccessControlErrorPane,
} from '@folio/stripes-erm-components';

import {
  AmendmentInfo,
  AmendmentLicense,
  CoreDocs,
  LicenseAgreements,
  LicenseAmendments,
  SupplementaryDocs,
} from '../viewSections';

import { useLicensesContexts } from '../../hooks';
import { CUSTPROP_ENDPOINT } from '../../constants';

const Amendment = ({
  accessControlData: {
    canRead,
    canReadLoading,
    canEdit,
    canEditLoading,
    canDelete,
    canDeleteLoading,
  } = {
    canRead: true,
    canReadLoading: false,
    canEdit: true,
    canEditLoading: false,
    canDelete: true,
    canDeleteLoading: false,
  }, // If not passed, assume everything is accessible and not loading...?
  data,
  handlers,
  isLoading,
  urls,
}) => {
  const accordionStatusRef = useRef();

  const { data: custpropContexts = [] } = useLicensesContexts();
  // Ensure the custprops with no contexts get rendered
  const contexts = ['isNull', ...custpropContexts];

  const getSectionProps = (id) => {
    return {
      amendment: data.amendment,
      id,
      handlers,
      license: data.license,
      record: data.amendment,
      recordType: 'amendment',
      urls,
    };
  };

  const getInitialAccordionsState = () => {
    return {
      amendmentCoreDocs: false,
      amendmentSupplementaryDocs: false,
      amendmentTerms: false,
      licenseAgreements: false,
      AccessControl: false,
    };
  };

  const visibleColumns = [
    'linkNote',
    'name',
    'startDate',
    'endDate',
    'agreementStatus',
    'linkStatus',
    'amendmentLinkStatus'
  ];

  const renderActionMenu = ({ onToggle }) => {
    const amendmentId = data.amendment.id;
    if (!urls.editAmendment && !handlers.onDelete) return null;

    return (
      <>
        {urls.editAmendment &&
          <>
            <Button
              buttonStyle="dropdownItem"
              disabled={canEditLoading || !canEdit}
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
            disabled={canDeleteLoading || !canDelete}
            id="clickable-delete-amendment"
            onClick={() => {
              handlers.onDelete();
              onToggle();
            }}
          >
            <Icon icon={canEditLoading ? 'spinner-ellipsis' : 'trash'}>
              <FormattedMessage id="ui-licenses.delete" />
            </Icon>
          </Button>
        }
      </>
    );
  };

  const paneProps = {
    defaultWidth: '45%',
    dismissible: true,
    id: 'pane-view-amendment',
    onClose: handlers.onClose,
  };

  if (isLoading || canReadLoading) return <LoadingPane data-loading {...paneProps} />;

  if (!canRead) {
    return (
      <AccessControlErrorPane
        {...paneProps}
      />
    );
  }

  const shortcuts = [
    {
      name: 'edit',
      // TODO we have two different method calls for the same action
      handler: () => handlers.onEditAmendment(data.amendment.id),
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
      handler: () => handlers.onClone(data.amendment.id)
    }
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Pane
        actionMenu={renderActionMenu}
        appIcon={<AppIcon app="licenses" iconKey="amendment" />}
        paneTitle={<FormattedMessage id="ui-licenses.amendments.view.paneTitle" values={{ name: data.amendment.name }} />}
        {...paneProps}
      >
        <TitleManager record={data.amendment.name}>
          <AmendmentInfo {...getSectionProps()} />
          <AmendmentLicense {...getSectionProps()} />
          <AccordionStatus ref={accordionStatusRef}>
            <Row end="xs">
              <Col xs>
                <ExpandAllButton />
              </Col>
            </Row>
            <AccordionSet initialStatus={getInitialAccordionsState()}>
              <AccessControl policies={data.policies} />
              {data.license?.amendments?.length > 1 && <LicenseAmendments {...getSectionProps('licenseAmendments')} licenseAmendmentsAccordionLabel={<FormattedMessage id="ui-licenses.section.amendmentsOnParentLicense" />} />}
              {data.amendment?.docs?.length > 0 && <CoreDocs {...getSectionProps('amendmentCoreDocs')} />}
              <CustomPropertiesView
                contexts={contexts}
                customProperties={data.amendment.customProperties}
                customPropertiesEndpoint={CUSTPROP_ENDPOINT}
                id="terms"
              />
              {data.amendment?.supplementaryDocs?.length > 0 && <SupplementaryDocs {...getSectionProps('amendmentSupplementaryDocs')} />}
              {data.license?.linkedAgreements?.length > 0 && <LicenseAgreements {...getSectionProps('licenseAgreements')} visibleColumns={visibleColumns} />}
            </AccordionSet>
          </AccordionStatus>
        </TitleManager>
      </Pane>
    </HasCommand>
  );
};

Amendment.propTypes = {
  accessControlData: PropTypes.shape({
    canRead: PropTypes.bool,
    canReadLoading: PropTypes.bool,
    canEdit: PropTypes.bool,
    canEditLoading: PropTypes.bool,
    canDelete: PropTypes.bool,
    canDeleteLoading: PropTypes.bool,
  }),
  data: PropTypes.shape({
    amendment: PropTypes.shape({
      customProperties: PropTypes.object,
      docs: PropTypes.arrayOf(PropTypes.object),
      id: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.shape({
        label: PropTypes.string,
      }),
      supplementaryDocs: PropTypes.arrayOf(PropTypes.object),
      policies: PropTypes.arrayOf(PropTypes.shape({})),
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
};

export default Amendment;
