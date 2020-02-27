import React from 'react';
import PropTypes from 'prop-types';
import { mapValues, pickBy, sortBy } from 'lodash';
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
    onCompareLicenseTerms: PropTypes.func,
    selectedLicenses: PropTypes.arrayOf(PropTypes.string),
    terms: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);

    this.licenseInformationArray = ['name', 'startDate', 'endDate', 'status', 'type'];
    this.termsArray = ['value', 'note', 'publicNote', 'internal'];
    this.termNamesArray = sortBy(props.terms, (term) => {
      return term?.label?.toLowerCase();
    }).map(item => item.name); // Sort terms array of objects by the label and return a new array of term names

    /* create objects of the format
        { 'name' : '<FormattedMessage id=ui-licenses.exportLicensesModal.name />',
          'startDate' : '<FormattedMessage id=ui-licenses.exportLicensesModal.startDate />',
        ...
        }
      for the terms and licenseInformation arrays
    */
    this.licenseInformation = this.licenseInformationArray.reduce((obj, prop) => (
      { ...obj, [prop]: <FormattedMessage id={`ui-licenses.exportLicensesModal.${prop}`} /> }
    ), {});

    this.terms = this.termsArray.reduce((obj, prop) => (
      { ...obj, [prop]: <FormattedMessage id={`ui-licenses.exportLicensesModal.${prop}`} /> }
    ), {});

    // Create an object with a mapping between the term name and its label
    this.termNames = props.terms.reduce((map, term) => {
      map[term.name] = term.label;
      return map;
    }, {});

    // Default state for all the checkboxes initialized to fasle (unchecked)
    this.state = {
      licenseInformation: mapValues(this.licenseInformation, () => false),
      terms: mapValues(this.terms, () => false),
      termNames: mapValues(this.termNames, () => false)
    };
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

    this.setState(() => ({
      [section]: mapValues(this[section], () => checked),
    }));
  }

  updateSelection = (e, section) => {
    const { checked, name } = e.target;
    this.setState(prevState => ({
      [section]: { ...prevState[section], [name]: checked }
    }));
  };

  renderCheckboxesList = (section) => {
    return (
      <>
        <Checkbox
          checked={Object.values(this.state[section]).includes(false) !== true}
          label={<strong><FormattedMessage id={`ui-licenses.exportLicensesModal.${section}`} /></strong>}
          onChange={(e) => this.toggleSelectSection(e, section)}
          value={section}
        />
        <Layout className="padding-start-gutter">
          {
          this[`${section}Array`].map((item, index) => (
            <Checkbox
              checked={this.state[section][item]}
              key={index}
              label={this[section][item]}
              labelClass={css.labelClass}
              name={item}
              onChange={(e) => this.updateSelection(e, section)}
              value={item}
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
          disabled={Object.values({ ...licenseInformation, ...terms, ...termNames }).includes(true) !== true}
          id="export-licenses-modal-save-button"
          onClick={() => {
            const payload = {
              ids: this.props.selectedLicenses,
              include: { ...pickBy(licenseInformation), ...{ 'customProperties': pickBy(termNames) } },
              terms: pickBy(terms)
            };

            this.props.onCompareLicenseTerms(payload)
              .finally(() => this.props.onClose());
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

  render() {
    return (
      <div>
        {this.renderExportLicenseAsCSVModal()}
      </div>
    );
  }
}
