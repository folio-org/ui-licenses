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
import { TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import AmendmentFormInfo from '../formSections/AmendmentFormInfo';

import {
  FormCoreDocs,
  FormSupplementaryDocs,
} from '../formSections';

import { CUSTPROP_ENDPOINT } from '../../constants/endpoints';
import { useLicensesContexts } from '../../hooks';

const AmendmentForm = ({
  data = {},
  form,
  handlers,
  handleSubmit,
  isLoading,
  initialValues = {},
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
      amendmentFormCoreDocs: true,
      amendmentFormSupplementaryDocs: true,
      amendmentFormTerms: true,
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
    let buttonId;
    if (initialValues && initialValues.id) {
      buttonId = 'clickable-update-amendment';
    } else {
      buttonId = 'clickable-create-amendment';
    }

    const startButton = (
      <Button
        buttonStyle="default mega"
        id="clickable-cancel"
        marginBottom0
        onClick={handlers.onClose}
      >
        <FormattedMessage id="stripes-components.cancel" />
      </Button>
    );

    const endButton = (
      <Button
        buttonStyle="primary mega"
        disabled={pristine || submitting}
        id={buttonId}
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
  };

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-licenses.amendments.closePane">
          {ariaLabel => (
            <IconButton
              aria-label={ariaLabel?.[0]}
              icon="times"
              id="close-amendment-form-button"
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
    id: 'pane-amendment-form',
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
              centerContent
              firstMenu={renderFirstMenu()}
              footer={renderPaneFooter()}
              paneTitle={id ? <FormattedMessage id="ui-licenses.amendments.edit" values={{ name }} /> : <FormattedMessage id="ui-licenses.amendments.create" />}
              {...paneProps}
            >
              <TitleManager record={id ? name : create?.[0]}>
                <form id="form-amendment">
                  <AmendmentFormInfo {...getSectionProps()} />
                  <AccordionStatus ref={accordionStatusRef}>
                    <Row end="xs">
                      <Col xs>
                        <ExpandAllButton />
                      </Col>
                    </Row>
                    <AccordionSet initialStatus={getInitialAccordionsState()}>
                      <FormCoreDocs {...getSectionProps('amendmentFormCoreDocs')} />
                      <CustomPropertiesEdit
                        contexts={contexts}
                        customPropertiesEndpoint={CUSTPROP_ENDPOINT}
                        id="terms"
                      />
                      <FormSupplementaryDocs {...getSectionProps('amendmentFormSupplementaryDocs')} />
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

AmendmentForm.propTypes = {
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
};

export default stripesFinalForm({
  initialValuesEqual: (a, b) => isEqual(a, b),
  navigationCheck: true,
  mutators: { setFieldData },
  subscription: {
    values: true,
  },
})(AmendmentForm);
