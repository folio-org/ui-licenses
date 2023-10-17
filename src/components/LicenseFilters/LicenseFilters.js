import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { FormattedMessage, useIntl } from 'react-intl';

import { Accordion, AccordionSet, FilterAccordionHeader, Selection } from '@folio/stripes/components';
import { CheckboxFilter, MultiSelectionFilter } from '@folio/stripes/smart-components';
import { DateFilter, OrganizationSelection } from '@folio/stripes-erm-components';

import { CustomPropertiesFilter } from '@k-int/stripes-kint-components';

import LicenseContentFilter from '../LicenseContentFilter';
import { CUSTPROP_ENDPOINT } from '../../constants';

const FILTERS = [
  'status',
  'type',
];

export default function LicenseFilters({ activeFilters, data, filterHandlers }) {
  const intl = useIntl();

  const [filterState, setFilterState] = useState({
    status: [],
    type: [],
    tags: [],
  });

  useEffect(() => {
    const newState = {};
    FILTERS.forEach(filter => {
      const values = data[`${filter}Values`];
      if (!isEqual(values, filterState[filter])) {
        newState[filter] = values;
      }
    });

    if ((data?.tags?.length ?? 0) !== filterState.tags?.length) {
      newState.tags = data.tags.map(({ label }) => ({ value: label, label }));
    }

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

  const renderOrganizationFilter = () => {
    const orgFilters = activeFilters.org || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={orgFilters.length > 0}
        header={FilterAccordionHeader}
        label={<FormattedMessage id="ui-licenses.filters.organization" />}
        onClearFilter={() => {
          filterHandlers.state({
            ...activeFilters,
            org: [],
          });
        }}
        separator={false}
      >
        <OrganizationSelection
          input={{
            name: 'license-orgs-filter',
            onChange: value => filterHandlers.state({ ...activeFilters, org: [value] }),
            value: orgFilters[0] || '',
          }}
          path="licenses/org"
        />
      </Accordion>
    );
  };

  const renderOrganizationRoleFilter = () => {
    const roles = data.orgRoleValues;
    const dataOptions = roles.map(role => ({
      value: role.id,
      label: role.label,
    }));

    const roleFilters = activeFilters.role || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={roleFilters.length > 0}
        header={FilterAccordionHeader}
        label={<FormattedMessage id="ui-licenses.filters.organizationRole" />}
        onClearFilter={() => { filterHandlers.clearGroup('role'); }}
        separator={false}
      >
        <FormattedMessage id="ui-licenses.organizations.selectRole">
          {([placeholder]) => (
            <Selection
              dataOptions={dataOptions}
              id="org-role-selector"
              onChange={value => filterHandlers.state({ ...activeFilters, role: [value] })}
              placeholder={placeholder}
              value={roleFilters[0] || ''}
            />
          )}
        </FormattedMessage>
      </Accordion>
    );
  };

  const renderTagsFilter = () => {
    const tagFilters = activeFilters.tags || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={tagFilters.length > 0}
        header={FilterAccordionHeader}
        id="clickable-tags-filter"
        label={<FormattedMessage id="ui-licenses.tags" />}
        onClearFilter={() => { filterHandlers.clearGroup('tags'); }}
        separator={false}
      >
        <MultiSelectionFilter
          dataOptions={filterState.tags || []}
          id="tags-filter"
          name="tags"
          onChange={e => filterHandlers.state({ ...activeFilters, tags: e.values })}
          selectedValues={tagFilters}
        />
      </Accordion>
    );
  };

  const renderStartDateFilter = () => {
    return <DateFilter
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
      name="startDate"
      resourceName={intl.formatMessage({ id: 'ui-licenses.licenses' }).toLowerCase()}
    />;
  };

  const renderEndDateFilter = () => {
    return <DateFilter
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
      name="endDate"
      resourceName={intl.formatMessage({ id: 'ui-licenses.licenses' }).toLowerCase()}
    />;
  };

  const renderCustomPropertyFilters = () => {
    return <CustomPropertiesFilter
      activeFilters={activeFilters}
      customPropertiesEndpoint={CUSTPROP_ENDPOINT}
      filterHandlers={filterHandlers}
    />;
  };

  const renderLicenseContentFilter = () => {
    const licenseContentFilters = activeFilters.licenseContent || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={licenseContentFilters.length > 0}
        header={FilterAccordionHeader}
        id="clickable-license-content-filter"
        label={<FormattedMessage id="ui-licenses.licenseContent" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('licenseContent');
        }}
        separator={false}
      >
        <LicenseContentFilter
          activeFilters={activeFilters}
          filterHandlers={filterHandlers}
          licenseContentFilters={licenseContentFilters}
          name="licenseContent"
        />
      </Accordion>
    );
  };

  return (
    <AccordionSet>
      {renderCheckboxFilter('status')}
      {renderCheckboxFilter('type')}
      {renderOrganizationFilter()}
      {renderOrganizationRoleFilter()}
      {renderTagsFilter()}
      {renderStartDateFilter()}
      {renderEndDateFilter()}
      {renderCustomPropertyFilters()}
      {renderLicenseContentFilter()}
    </AccordionSet>
  );
}

LicenseFilters.propTypes = {
  activeFilters: PropTypes.object,
  data: PropTypes.object.isRequired,
  filterHandlers: PropTypes.object,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }),
};

LicenseFilters.defaultProps = {
  activeFilters: {
    status: [],
    type: [],
  }
};
