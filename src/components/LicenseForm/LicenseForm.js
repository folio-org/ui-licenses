import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEqual } from 'lodash';
import setFieldData from 'final-form-set-field-data';
import { CustomPropertiesEdit } from '@k-int/stripes-kint-components';
import { handleSaveKeyCommand } from '@folio/stripes-erm-components';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ExpandAllButton,
  HasCommand,
  IconButton,
  LoadingView,
  Pane,
  PaneFooter,
  PaneMenu,
  Paneset,
  Row,
  checkScope,
  collapseAllSections,
  expandAllSections
} from '@folio/stripes/components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  LicenseFormInfo,
  LicenseFormInternalContacts,
  LicenseFormOrganizations,
  FormCoreDocs,
  FormSupplementaryDocs,
} from '../formSections';

import { CUSTPROP_ENDPOINT } from '../../constants/endpoints';
import { useLicensesContexts } from '../../hooks';

const LicenseForm = ({
  data = {},
  handlers,
  handleSubmit,
  isLoading,
  form,
  pristine,
  submitting,
  values = {},
}) => {
  const accordionStatusRef = useRef();
  const { data: custpropContexts = [] } = useLicensesContexts();
  // Ensure the custprops with no contexts get rendered
  const contexts = ['isNull', ...custpropContexts];

  const getInitialAccordionsState = () => {
    return {
      licenseFormInternalContacts: true,
      licenseFormOrganizations: true,
      licenseFormDocs: true,
      licenseFormTerms: true,
      licenseFormSupplementaryDocs: true
    };
  };

  const getSectionProps = (sectionId) => {
    return {
      data,
      handlers,
      id: sectionId,
      mutators: form.mutators,
      values,
    };
  };

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={(
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            id={values.id ? 'clickable-update-license' : 'clickable-create-license'}
            marginBottom0
            onClick={handleSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        )}
        renderStart={(
          <Button
            buttonStyle="default mega"
            id="clickable-cancel"
            marginBottom0
            onClick={handlers.onClose}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        )}
      />
    );
  };

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-licenses.closeEditLicense">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-license-form-button"
              onClick={handlers.onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  /* istanbul ignore next */
  const shortcuts = [
    {
      name: 'save',
      handler: (e) => handleSaveKeyCommand(e, { handleSubmit, pristine, submitting }),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    }
  ];

  const { id, name } = values;

  const paneProps = {
    defaultWidth: '100%',
    id: 'pane-license-form',
  };

  if (isLoading) return <LoadingView {...paneProps} />;

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Paneset>
        <FormattedMessage id="ui-licenses.create">
          {create => (
            <Pane
              appIcon={<AppIcon app="licenses" />}
              centerContent
              defaultWidth="100%"
              firstMenu={renderFirstMenu()}
              footer={renderPaneFooter()}
              paneTitle={id ? <FormattedMessage id="ui-licenses.editLicense.name" values={{ name }} /> : <FormattedMessage id="ui-licenses.createLicense" />}
            >
              <TitleManager record={id ? name : create?.[0]}>
                <form id="form-license">
                  <AccordionStatus ref={accordionStatusRef}>
                    <Row end="xs">
                      <Col xs>
                        <ExpandAllButton />
                      </Col>
                    </Row>
                    <AccordionSet initialStatus={getInitialAccordionsState()}>
                      <LicenseFormInfo {...getSectionProps('licenseFormInfo')} />
                      <LicenseFormInternalContacts {...getSectionProps('licenseFormInternalContacts')} />
                      <LicenseFormOrganizations {...getSectionProps('licenseFormOrganizations')} />
                      <FormCoreDocs {...getSectionProps('licenseFormDocs')} />
                      <CustomPropertiesEdit
                        contexts={contexts}
                        customPropertiesEndpoint={CUSTPROP_ENDPOINT}
                        id="terms"
                      />
                      <FormSupplementaryDocs {...getSectionProps('licenseFormSupplementaryDocs')} />
                    </AccordionSet>
                  </AccordionStatus>
                </form>
              </TitleManager>
            </Pane>
          )}
        </FormattedMessage>
      </Paneset>
    </HasCommand>
  );
};

LicenseForm.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  handlers: PropTypes.PropTypes.shape({
    onClose: PropTypes.func.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  form: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  values: PropTypes.object,
};

export default stripesFinalForm({
  initialValuesEqual: (a, b) => isEqual(a, b),
  navigationCheck: true,
  subscription: {
    values: true,
  },
  mutators: { setFieldData }
})(LicenseForm);
