import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { FormattedMessage, useIntl } from 'react-intl';

import { CustomPropertiesFilter } from '@k-int/stripes-kint-components';

import { Accordion, AccordionSet, FilterAccordionHeader } from '@folio/stripes/components';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import { DateFilter, DocumentFilter } from '@folio/stripes-erm-components';


import { CUSTPROP_ENDPOINT } from '../../constants';

const FILTERS = [
  'status',
];

export default function AmendmentFilters({ activeFilters, data, filterHandlers }) {
  const intl = useIntl();

  const [filterState, setFilterState] = useState({
    status: [],
  });

  const atTypeValues = data.documentAtTypeValues;

  useEffect(() => {
    const newState = {};
    FILTERS.forEach(filter => {
      const values = data[`${filter}Values`];
      if (!isEqual(values, filterState[filter])) {
        newState[filter] = values;
      }
    });

    if (Object.keys(newState).length) {
      setFilterState(prevState => ({ ...prevState, ...newState }));
    }
  }, [data, filterState]);

  const renderCheckboxFilter = (name, prps) => {
    const groupFilters = activeFilters[name] || [];

    return (
      <Accordion
        displayClearButton={groupFilters.length > 0}
        header={FilterAccordionHeader}
        id={`filter-accordion-${name}`}
        label={<FormattedMessage id={`ui-licenses.prop.${name}`} />}
        onClearFilter={() => { filterHandlers.clearGroup(name); }}
        separator={false}
        {...prps}
      >
        <CheckboxFilter
          dataOptions={filterState[name] || []}
          name={name}
          onChange={(group) => { filterHandlers.state({ ...activeFilters, [group.name]: group.values }); }}
          selectedValues={groupFilters}
        />
      </Accordion>
    );
  };

  const renderStartDateFilter = () => {
    return <DateFilter
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
      name="startDate"
      resourceName={intl.formatMessage({ id: 'ui-licenses.amendments' }).toLowerCase()}
    />;
  };

  const renderEndDateFilter = () => {
    return <DateFilter
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
      name="endDate"
      resourceName={intl.formatMessage({ id: 'ui-licenses.amendments' }).toLowerCase()}
    />;
  };

  const renderCustomPropertyFilters = () => {
    return <CustomPropertiesFilter
      activeFilters={activeFilters}
      customPropertiesEndpoint={CUSTPROP_ENDPOINT}
      filterHandlers={filterHandlers}
    />;
  };

  // for supplementary documents pass the atTypeValues
  const renderSupplementaryDocumentFilter = () => {
    return <DocumentFilter
      activeFilters={activeFilters}
      atTypeValues={atTypeValues}
      filterHandlers={filterHandlers}
    />;
  };

  // for core documents DO NOT pass the atTypeValues
  const renderCoreDocumentFilter = () => {
    return <DocumentFilter
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
    />;
  };


  return (
    <AccordionSet>
      {renderCheckboxFilter('status')}
      {renderStartDateFilter()}
      {renderEndDateFilter()}
      {renderCustomPropertyFilters()}
      {renderSupplementaryDocumentFilter()}
      {renderCoreDocumentFilter()}
    </AccordionSet>
  );
}

AmendmentFilters.propTypes = {
  activeFilters: PropTypes.object,
  data: PropTypes.object.isRequired,
  filterHandlers: PropTypes.object,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }),
};

AmendmentFilters.defaultProps = {
  activeFilters: {
    status: [],
  }
};
