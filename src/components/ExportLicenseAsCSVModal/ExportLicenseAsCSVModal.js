import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { keyBy, mapValues, pickBy, sortBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Checkbox,
  Layout,
  Modal,
  ModalFooter,
} from '@folio/stripes/components';

import { useCustomProperties } from '@k-int/stripes-kint-components';

import css from './ExportLicenseAsCSVModal.css';
import { CUSTPROP_ENDPOINT } from '../../constants/endpoints';

const propTypes = {
  onClose: PropTypes.func,
  onCompareLicenseTerms: PropTypes.func,
  selectedLicenses: PropTypes.arrayOf(PropTypes.string),
};

const keys = {
  licenseInformation: [
    { key: 'name', value: <FormattedMessage id="ui-licenses.exportLicensesModal.name" /> },
    { key: 'startDate', value: <FormattedMessage id="ui-licenses.exportLicensesModal.startDate" /> },
    { key: 'endDate', value : <FormattedMessage id="ui-licenses.exportLicensesModal.endDate" /> },
    { key: 'status', value: <FormattedMessage id="ui-licenses.exportLicensesModal.status" /> },
    { key: 'type', value: <FormattedMessage id="ui-licenses.exportLicensesModal.type" /> },
  ],
  terms: [
    { key: 'value', value: <FormattedMessage id="ui-licenses.exportLicensesModal.value" /> },
    { key: 'note', value: <FormattedMessage id="ui-licenses.exportLicensesModal.note" /> },
    { key: 'publicNote', value : <FormattedMessage id="ui-licenses.exportLicensesModal.publicNote" /> },
    { key: 'internal', value: <FormattedMessage id="ui-licenses.exportLicensesModal.internal" /> },
  ]
};

const ExportLicenseAsCSVModal = ({
  onCompareLicenseTerms,
  onClose,
  selectedLicenses
}) => {
  const { data: fetchedTerms = [], isLoading } = useCustomProperties({
    endpoint: CUSTPROP_ENDPOINT,
    returnQueryObject: true,
    options: {
      sort: [
        { path: 'retired' }, // Place retired custprops at the end
        { path: 'primary', direction: 'desc' }, // Primary properties should display before optional
        { path: 'label' } // Within those groups, sort by label
      ]
    }
  });

  /* istanbul ignore next */
  keys.termNames = sortBy(fetchedTerms, (term) => {
    return term?.label?.toLowerCase();
  }).map(item => {
    return {
      'key': item.name,
      'value': item.label
    };
  });

  const [checkedState, setCheckedState] = useState({
    licenseInformation: mapValues(keyBy(keys.licenseInformation, 'key'), () => false),
    terms: mapValues(keyBy(keys.terms, 'key'), () => false),
    termNames: mapValues(keyBy(keys.termNames, 'key'), () => false)
  });

  useEffect(() => {
    // Once terms are loaded, make sure state is sufficiently set up
    if (!isLoading) {
      setCheckedState(prevState => ({
        ...prevState,
        termNames: mapValues(keyBy(keys.termNames, 'key'), () => false)
      }));
    }
  }, [isLoading]);

  /* istanbul ignore next */
  const toggleSelectAll = (e) => {
    const { checked } = e.target;

    setCheckedState(prevState => ({
      licenseInformation: mapValues(prevState.licenseInformation, () => checked),
      terms: mapValues(prevState.terms, () => checked),
      termNames: mapValues(prevState.termNames, () => checked),
    }));
  };

  /* istanbul ignore next */
  const toggleSelectSection = (e, section) => {
    const { checked } = e.target;

    setCheckedState(prevState => ({
      ...prevState,
      [section]: mapValues(prevState[section], () => checked),
    }));
  };

  /* istanbul ignore next */
  const updateSelection = (e, section) => {
    const { checked, name } = e.target;
    setCheckedState(prevState => ({
      ...prevState,
      [section]: { ...prevState[section], [name]: checked }
    }));
  };

  const renderCheckboxesList = (section) => {
    return (
      <>
        <Checkbox
          checked={Object.values(checkedState[section]).includes(false) !== true}
          label={<strong><FormattedMessage id={`ui-licenses.exportLicensesModal.${section}`} /></strong>}
          onChange={(e) => toggleSelectSection(e, section)}
          value={section}
        />
        <Layout className="padding-start-gutter">
          {
          keys[section].map(({ key, value }, index) => (
            <Checkbox
              key={index}
              checked={checkedState[section][key]}
              label={value}
              labelClass={css.labelClass}
              name={key}
              onChange={(e) => updateSelection(e, section)}
              value={key}
            />
          ))
        }
        </Layout>
      </>
    );
  };

  const renderExportLicenseAsCSVModal = () => {
    const { licenseInformation, terms, termNames } = checkedState;

    const footer = (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          disabled={Object.values({ ...licenseInformation, ...terms, ...termNames }).includes(true) !== true}
          id="export-licenses-modal-save-button"
          onClick={() => {
            const payload = {
              ids: selectedLicenses,
              include: { ...pickBy(licenseInformation), ...{ 'customProperties': pickBy(termNames) } },
              terms: pickBy(terms)
            };

            onCompareLicenseTerms(payload)
              .then(() => onClose());
          }}
        >
          <FormattedMessage id="stripes-components.saveAndClose" />
        </Button>
        <Button
          buttonStyle="default"
          id="export-licenses-modal-cancel-button"
          onClick={onClose}
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
        onClose={onClose}
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
            onChange={toggleSelectAll}
            value="selectAll"
          />
        </Layout>
        <div className={css.separator} />
        {renderCheckboxesList('licenseInformation')}
        {renderCheckboxesList('terms')}
        <Layout className="padding-start-gutter">
          {renderCheckboxesList('termNames')}
        </Layout>
      </Modal>
    );
  };

  return (
    <div>
      {renderExportLicenseAsCSVModal()}
    </div>
  );
};

ExportLicenseAsCSVModal.propTypes = propTypes;

export default ExportLicenseAsCSVModal;
