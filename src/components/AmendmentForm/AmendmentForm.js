import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEqual } from 'lodash';
import setFieldData from 'final-form-set-field-data';
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
import { TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import AmendmentFormInfo from '../formSections/AmendmentFormInfo';

import {
  FormCoreDocs,
  FormSupplementaryDocs,
  FormTerms,
} from '../formSections';

class AmendmentForm extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    form: PropTypes.object,
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
    }),
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    values: PropTypes.object,
  }

  static defaultProps = {
    initialValues: {},
  }

  constructor(props) {
    super(props);
    this.accordionStatusRef = React.createRef();
  }

  getInitialAccordionsState = () => {
    return {
      amendmentFormCoreDocs: true,
      amendmentFormSupplementaryDocs: true,
      amendmentFormTerms: true,
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

  renderPaneFooter() {
    const {
      handleSubmit,
      initialValues,
      pristine,
      submitting,
    } = this.props;

    let id;
    if (initialValues && initialValues.id) {
      id = 'clickable-update-amendment';
    } else {
      id = 'clickable-create-amendment';
    }

    const startButton = (
      <Button
        buttonStyle="default mega"
        id="clickable-cancel"
        marginBottom0
        onClick={this.props.handlers.onClose}
      >
        <FormattedMessage id="stripes-components.cancel" />
      </Button>
    );

    const endButton = (
      <Button
        buttonStyle="primary mega"
        disabled={pristine || submitting}
        id={id}
        marginBottom0
        onClick={handleSubmit}
        type="submit"
      >
        <FormattedMessage id="stripes-components.saveAndClose" />
      </Button>
    );

    return (
      <PaneFooter
        renderEnd={endButton}
        renderStart={startButton}
      />
    );
  }

  renderFirstMenu() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-licenses.amendments.closePane">
          {ariaLabel => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-amendment-form-button"
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
      handler: (e) => handleSaveKeyCommand(e, this.props),
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
    const {
      initialValues: { id, name },
      isLoading,
    } = this.props;

    const paneProps = {
      defaultWidth: '100%',
      id: 'pane-amendment-form',
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
                centerContent
                firstMenu={this.renderFirstMenu()}
                footer={this.renderPaneFooter()}
                paneTitle={id ? <FormattedMessage id="ui-licenses.amendments.edit" values={{ name }} /> : <FormattedMessage id="ui-licenses.amendments.create" />}
                {...paneProps}
              >
                <TitleManager record={id ? name : create}>
                  <form id="form-amendment">
                    <AmendmentFormInfo {...this.getSectionProps()} />
                    <AccordionStatus ref={this.accordionStatusRef}>
                      <Row end="xs">
                        <Col xs>
                          <ExpandAllButton />
                        </Col>
                      </Row>
                      <AccordionSet initialStatus={this.getInitialAccordionsState()}>
                        <FormCoreDocs {...this.getSectionProps('amendmentFormCoreDocs')} />
                        <FormTerms {...this.getSectionProps('amendmentFormTerms')} />
                        <FormSupplementaryDocs {...this.getSectionProps('amendmentFormSupplementaryDocs')} />
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
  mutators: { setFieldData },
  subscription: {
    values: true,
  },
})(AmendmentForm);
