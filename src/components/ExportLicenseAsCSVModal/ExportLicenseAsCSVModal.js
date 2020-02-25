import React from 'react';
import PropTypes from 'prop-types';
import { mapValues, pickBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Checkbox,
  Layout,
  Modal,
  ModalFooter,
} from '@folio/stripes/components';

import css from './ExportLicenseAsCSVModal.css';

export default class ExportLicenseAsCSVModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    selectedLicenses: PropTypes.arrayOf(PropTypes.string),
    terms: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);

    this.licenseInformation = {
      name: <FormattedMessage id="ui-licenses.prop.name" />,
      startDate: <FormattedMessage id="ui-licenses.prop.startDate" />,
      endDate: <FormattedMessage id="ui-licenses.prop.endDate" />,
      status: <FormattedMessage id="ui-licenses.prop.status" />,
      type: <FormattedMessage id="ui-licenses.prop.type" />,
    };

    this.terms = {
      value: <FormattedMessage id="ui-licenses.prop.termValue" />,
      note: <FormattedMessage id="ui-licenses.prop.internalNote" />,
      publicNote: <FormattedMessage id="ui-licenses.prop.publicNote" />,
      internal: <FormattedMessage id="ui-licenses.prop.termVisibility" />,
    };

    this.termNames = props.terms.reduce((map, term) => {
      map[term.name] = term.label;
      return map;
    }, {});

    this.state = {
      licenseInformation: mapValues(this.licenseInformation, () => false),
      terms: mapValues(this.terms, () => false),
      termNames: mapValues(this.termNames, () => false)
    };
  }

  renderCheckboxesList = (section) => {
    const { terms, termNames } = this.state;
    return (
      <>
        <Checkbox
          checked={section === 'terms' ?
            Object.values({ ...terms, ...termNames }).includes(false) !== true :
            Object.values(this.state[section]).includes(false) !== true}
          label={<strong><FormattedMessage id={`ui-licenses.exportLicensesModal.${section}`} /></strong>}
          onChange={(e) => this.toggleSelectSection(e, section)}
          value={section}
        />
        <Layout className="padding-start-gutter">
          {
          Object.entries(this[section]).map(([prop, value], index) => (
            <Checkbox
              checked={this.state[section][prop]}
              key={index}
              label={value}
              labelClass={css.labelClass}
              name={prop}
              onChange={(e) => this.updateSelection(e, section)}
              value={prop}
            />
          ))
        }
        </Layout>
      </>
    );
  }

  renderExportLicenseAsCSVModal = () => {
    const { licenseInformation, terms, termNames } = this.state;
    const footer = (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          disabled={Object.values({ ...licenseInformation, ...terms, ...termNames }).every(item => item === false)}
          id="export-licenses-modal-save-button"
          onClick={() => {
            return {
              ids: this.props.selectedLicenses,
              include: { ...pickBy(licenseInformation), ...pickBy(termNames) },
              terms: pickBy(terms)
            };
          }}
        >
          <FormattedMessage id="stripes-components.saveAndClose" />
        </Button>
        <Button
          buttonStyle="default"
          id="export-licenses-modal-cancel-button"
          onClick={this.props.onClose}
        >
          <FormattedMessage id="stripes-components.cancel" />
        </Button>
      </ModalFooter>
    );

    return (
      <Modal
        dismissible
        footer={footer}
        id="export-licenses-modal"
        label={<FormattedMessage id="ui-licenses.exportLicenses" />}
        onClose={this.props.onClose}
        open
        size="medium"
      >
        <Layout className="padding-bottom-gutter">
          <FormattedMessage id="ui-licenses.exportLicensesModal.message" />
        </Layout>
        <Layout className="padding-bottom-gutter">
          <Checkbox
            checked={Object.values({ ...licenseInformation, ...terms, ...termNames }).includes(false) !== true}
            label={<strong><FormattedMessage id="ui-licenses.exportLicensesModal.selectAll" /></strong>}
            onChange={this.toggleSelectAll}
            value="selectAll"
          />
        </Layout>
        <div className={css.separator} />
        {this.renderCheckboxesList('licenseInformation')}
        {this.renderCheckboxesList('terms')}
        <Layout className="padding-start-gutter">
          {this.renderCheckboxesList('termNames')}
        </Layout>
      </Modal>
    );
  }

  toggleSelectAll = (e) => {
    const { checked } = e.target;

    this.setState(() => ({
      licenseInformation: mapValues(this.licenseInformation, () => checked),
      terms: mapValues(this.terms, () => checked),
      termNames: mapValues(this.termNames, () => checked)
    }));
  }

  toggleSelectSection = (e, section) => {
    const { checked } = e.target;

    if (section === 'terms') {
      this.setState(() => ({
        terms: mapValues(this.terms, () => checked),
        termNames: mapValues(this.termNames, () => checked)
      }));
    } else {
      this.setState(() => ({
        [section]: mapValues(this[section], () => checked),
      }));
    }
  }

  updateSelection = (e, section) => {
    const { checked, name } = e.target;
    this.setState(prevState => ({
      [section]: { ...prevState[section], [name]: checked }
    }));
  };

  render() {
    return (
      <div>
        {this.renderExportLicenseAsCSVModal()}
      </div>
    );
  }
}
