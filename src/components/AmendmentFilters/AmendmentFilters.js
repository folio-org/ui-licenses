import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { FormattedMessage, useIntl } from 'react-intl';

import { CustomPropertiesFilter } from '@k-int/stripes-kint-components';

import { Accordion, AccordionSet, FilterAccordionHeader } from '@folio/stripes/components';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import { DateFilter, DocumentFilter, SimpleAccessControlFilter } from '@folio/stripes-erm-components';


import { LICENSE_ACCESSCONTROL_ENDPOINT, CUSTPROP_ENDPOINT, amendmentContentOptions } from '../../constants';

import ContentFilter from '../ContentFilter';

const FILTERS = [
  'status',
];

const AmendmentFilters = ({ activeFilters = { status: [] }, data, filterHandlers }) => {
  const intl = useIntl();

  const [filterState, setFilterState] = useState({
    status: [],
  });

  const categoryValues = data.documentAtTypeValues;

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

  // for supplementary documents pass the categoryValues
  const renderSupplementaryDocumentFilter = () => {
    return <DocumentFilter
      activeFilters={activeFilters}
      categoryValues={categoryValues}
      filterHandlers={filterHandlers}
      filterLabel={<FormattedMessage id="stripes-erm-components.documentFilter.filterName.supplementaryDocuments" />}
      filterModalProps={{
        label: <FormattedMessage id="stripes-erm-components.documentFilter.filterBuilder.supplementaryDocuments" />
      }}
      filterName="supplementaryDocs"
    />;
  };

  // for core documents DO NOT pass the categoryValues
  const renderCoreDocumentFilter = () => {
    return <DocumentFilter
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
      filterLabel={<FormattedMessage id="stripes-erm-components.documentFilter.filterName.coreDocuments" />}
      filterModalProps={{
        label: <FormattedMessage id="stripes-erm-components.documentFilter.filterBuilder.coreDocuments" />
      }}
    />;
  };

  const renderContentFilter = () => {
    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters?.amendmentContent?.length > 0}
        header={FilterAccordionHeader}
        id="clickable-content-filter"
        label={<FormattedMessage id="ui-licenses.content.filter.amendmentContent" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('amendmentContent');
        }}
        separator={false}
      >
        <ContentFilter
          activeFilters={activeFilters}
          contentOptions={amendmentContentOptions}
          filterHandlers={filterHandlers}
          name="amendmentContent"
        />
      </Accordion>
    );
  };


  const renderAccessControlFilter = () => {
    return (
      <SimpleAccessControlFilter
        accessControlEndpoint={LICENSE_ACCESSCONTROL_ENDPOINT}
        activeFilters={activeFilters}
        filterHandlers={filterHandlers}
      />
    );
  };

  return (
    <AccordionSet>
      {renderCheckboxFilter('status')}
      {renderAccessControlFilter()}
      {renderStartDateFilter()}
      {renderEndDateFilter()}
      {renderCustomPropertyFilters()}
      {renderSupplementaryDocumentFilter()}
      {renderCoreDocumentFilter()}
      {renderContentFilter()}
    </AccordionSet>
  );
};

AmendmentFilters.propTypes = {
  activeFilters: PropTypes.object,
  data: PropTypes.object.isRequired,
  filterHandlers: PropTypes.object,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }),
};

export default AmendmentFilters;
