import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { FormattedMessage, useIntl } from 'react-intl';

import { CustomPropertiesFilter } from '@k-int/stripes-kint-components';

import { Accordion, AccordionSet, FilterAccordionHeader } from '@folio/stripes/components';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import { DateFilter } from '@folio/stripes-erm-components';

import AmendmentContentFilter from '../AmendmentContentFilter';
import { CUSTPROP_ENDPOINT } from '../../constants';

const FILTERS = [
  'status',
];

export default function AmendmentFilters({ activeFilters, data, filterHandlers }) {
  const intl = useIntl();

  const [filterState, setFilterState] = useState({
    status: [],
  });

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

  const renderAmendmentContentFilter = () => {
    const amendmentContentFilters = activeFilters.amendmentContent || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={amendmentContentFilters.length > 0}
        header={FilterAccordionHeader}
        id="clickable-amendment-content-filter"
        label={<FormattedMessage id="ui-licenses.amendmentContent" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('amendmentContent');
        }}
        separator={false}
      >
        <AmendmentContentFilter
          activeFilters={activeFilters}
          amendmentContentFilters={amendmentContentFilters}
          filterHandlers={filterHandlers}
          name="amendmentContent"
        />
      </Accordion>
    );
  };

  return (
    <AccordionSet>
      {renderCheckboxFilter('status')}
      {renderStartDateFilter()}
      {renderEndDateFilter()}
      {renderCustomPropertyFilters()}
      {renderAmendmentContentFilter()}
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
