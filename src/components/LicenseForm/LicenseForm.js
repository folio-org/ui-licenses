import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEqual } from 'lodash';
import setFieldData from 'final-form-set-field-data';
import { checkScope, collapseAllSections, expandAllSections } from '@folio/stripes-erm-components';

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
} from '@folio/stripes/components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  LicenseFormInfo,
  LicenseFormInternalContacts,
  LicenseFormOrganizations,
  FormCoreDocs,
  FormSupplementaryDocs,
  FormTerms,
} from '../formSections';

class LicenseForm extends React.Component {
  static propTypes = {
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
  }

  constructor(props) {
    super(props);
    this.accordionStatusRef = React.createRef();
  }

  getInitialAccordionsState = () => {
    return {
      licenseFormInternalContacts: true,
      licenseFormOrganizations: true,
      licenseFormDocs: true,
      licenseFormTerms: true,
      licenseFormSupplementaryDocs: true
    };
  }

  getSectionProps(id) {
    const { data, handlers, form: { mutators }, values = {} } = this.props;

    return {
      data,
      handlers,
      id,
      mutators,
      values,
    };
  }

  handleSaveKeyCommand = (e) => {
    const {
      handleSubmit,
      pristine,
      submitting,
    } = this.props;

    e.preventDefault();

    if (!pristine && !submitting) {
      handleSubmit();
    }
  }

  renderPaneFooter() {
    const {
      handlers,
      handleSubmit,
      pristine,
      submitting,
      values,
    } = this.props;

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
  }

  renderFirstMenu() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-licenses.closeEditLicense">
          {ariaLabel => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-license-form-button"
              onClick={this.props.handlers.onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  shortcuts = [
    {
      name: 'save',
      handler: this.handleSaveKeyCommand,
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, this.accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, this.accordionStatusRef),
    }
  ];

  render() {
    const { isLoading, values: { id, name } } = this.props;

    const paneProps = {
      defaultWidth: '100%',
      id: 'pane-license-form',
    };

    if (isLoading) return <LoadingView {...paneProps} />;

    return (
      <HasCommand
        commands={this.shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <Paneset>
          <FormattedMessage id="ui-licenses.create">
            {create => (
              <Pane
                appIcon={<AppIcon app="licenses" />}
                centerContent
                firstMenu={this.renderFirstMenu()}
                footer={this.renderPaneFooter()}
                paneTitle={id ? name : <FormattedMessage id="ui-licenses.createLicense" />}
              >
                <TitleManager record={id ? name : create}>
                  <form id="form-license">
                    <AccordionStatus ref={this.accordionStatusRef}>
                      <Row end="xs">
                        <Col xs>
                          <ExpandAllButton />
                        </Col>
                      </Row>
                      <AccordionSet initialStatus={this.getInitialAccordionsState()}>
                        <LicenseFormInfo {...this.getSectionProps('licenseFormInfo')} />
                        <LicenseFormInternalContacts {...this.getSectionProps('licenseFormInternalContacts')} />
                        <LicenseFormOrganizations {...this.getSectionProps('licenseFormOrganizations')} />
                        <FormCoreDocs {...this.getSectionProps('licenseFormDocs')} />
                        <FormTerms {...this.getSectionProps('licenseFormTerms')} />
                        <FormSupplementaryDocs {...this.getSectionProps('licenseFormSupplementaryDocs')} />
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
  }
}

export default stripesFinalForm({
  initialValuesEqual: (a, b) => isEqual(a, b),
  navigationCheck: true,
  subscription: {
    values: true,
  },
  mutators: { setFieldData }
})(LicenseForm);
