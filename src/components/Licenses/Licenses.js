import React, { useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import {
  Button,
  Checkbox,
  FormattedUTCDate,
  HasCommand,
  Icon,
  MultiColumnList,
  Pane,
  PaneMenu,
  SearchField,
  checkScope
} from '@folio/stripes/components';

import { AppIcon, IfPermission } from '@folio/stripes/core';

import {
  CollapseFilterPaneButton,
  ExpandFilterPaneButton,
  PersistedPaneset,
  SearchAndSortNoResultsMessage,
  SearchAndSortQuery,
} from '@folio/stripes/smart-components';

import { LicenseEndDate } from '@folio/stripes-erm-components';
import ExportLicenseAsCSVModal from '../ExportLicenseAsCSVModal';

import LicenseFilters from '../LicenseFilters';
import { statuses } from '../../constants';

import css from './Licenses.css';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  history: PropTypes.object,
  onCompareLicenseTerms: PropTypes.func,
  onNeedMoreData: PropTypes.func,
  queryGetter: PropTypes.func,
  querySetter: PropTypes.func,
  searchString: PropTypes.string,
  selectedRecordId: PropTypes.string,
  source: PropTypes.object,
};

const filterPaneVisibilityKey = '@folio/licenses/licensesFilterPaneVisibility';

const Licenses = ({
  children,
  data,
  history,
  onCompareLicenseTerms,
  onNeedMoreData,
  queryGetter,
  querySetter,
  searchString,
  selectedRecordId,
  source,
}) => {
  const count = source?.totalCount() ?? 0;
  const query = queryGetter() ?? {};

  const [sortOrder, setSortOrder] = useState(['name', 'type', 'status', 'startDate', 'endDate']);
  const [sortDirection, setSortDirection] = useState(['asc', 'desc']);

  const sortMap = {
    name: l => l.name,
    type: l => l?.type?.label,
    status: l => l?.status?.label,
    startDate: l => l?.startDate,
    endDate: l => l?.endDate,
  };

  const onSort = (e, meta) => {
    if (!sortMap[meta.name]) return;

    if (sortOrder[0] !== meta.name) {
      setSortOrder([meta.name, sortOrder[0]]);
      setSortDirection(['asc', sortDirection[0]]);
    } else {
      const direction = (sortDirection[0] === 'desc') ? 'asc' : 'desc';
      setSortDirection([direction, sortDirection[1]]);
    }
  };

  const searchField = useRef(null);

  const [selectedLicenses, toggleLicenseSelection] = useReducer(
    (state, licenseId) => ({ ...state, [licenseId]: !state[licenseId] }),
    {}
  );
  const [showExportLicenseAsCSVModal, setShowExportLicenseAsCSVModal] = useState(false);

  const [storedFilterPaneVisibility] = useLocalStorage(filterPaneVisibilityKey, true);
  const [filterPaneIsVisible, setFilterPaneIsVisible] = useState(storedFilterPaneVisibility);
  const toggleFilterPane = () => {
    setFilterPaneIsVisible(!filterPaneIsVisible);
    writeStorage(filterPaneVisibilityKey, !filterPaneIsVisible);
  };

  const goToNew = () => {
    history.push(`/licenses/create${searchString}`);
  };

  const shortcuts = [
    {
      name: 'new',
      handler: goToNew,
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <div data-test-licenses>
        <SearchAndSortQuery
          initialFilterState={{ status: ['active'] }}
          initialSearchState={{ query: '' }}
          initialSortState={{ sort: 'name' }}
          queryGetter={queryGetter}
          querySetter={querySetter}
        >
          {
          ({
            searchValue,
            getSearchHandlers,
            onSubmitSearch,
            getFilterHandlers,
            activeFilters,
            filterChanged,
            searchChanged,
            resetAll,
          }) => {
            const disableReset = () => (!filterChanged && !searchChanged);
            const filterCount = activeFilters.string ? activeFilters.string.split(',').length : 0;

            // eslint-disable-next-line no-undef
            const contentData = _.orderBy(data.licenses,
              [sortMap[sortOrder[0]], sortMap[sortOrder[1]]], sortDirection);


            return (
              <PersistedPaneset appId="@folio/licenses" id="licenses-paneset">
                {filterPaneIsVisible &&
                  <Pane
                    defaultWidth="20%"
                    id="pane-license-filters"
                    lastMenu={
                      <PaneMenu>
                        <CollapseFilterPaneButton onClick={toggleFilterPane} />
                      </PaneMenu>
                    }
                    paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                  >
                    <form onSubmit={onSubmitSearch}>
                      {/* TODO: Use forthcoming <SearchGroup> or similar component */}
                      <div className={css.searchGroupWrap}>
                        <FormattedMessage id="ui-licenses.searchInputLabel">
                          {ariaLabel => (
                            <SearchField
                              aria-label={ariaLabel}
                              autoFocus
                              className={css.searchField}
                              data-test-license-search-input
                              id="input-license-search"
                              inputRef={searchField}
                              marginBottom0
                              name="query"
                              onChange={getSearchHandlers().query}
                              onClear={getSearchHandlers().reset}
                              value={searchValue.query}
                            />
                          )}
                        </FormattedMessage>
                        <Button
                          buttonStyle="primary"
                          disabled={!searchValue.query || searchValue.query === ''}
                          fullWidth
                          id="clickable-search-licenses"
                          marginBottom0
                          type="submit"
                        >
                          <FormattedMessage id="stripes-smart-components.search" />
                        </Button>
                      </div>
                      <div className={css.resetButtonWrap}>
                        <Button
                          buttonStyle="none"
                          disabled={disableReset()}
                          id="clickable-reset-all"
                          onClick={resetAll}
                        >
                          <Icon icon="times-circle-solid">
                            <FormattedMessage id="stripes-smart-components.resetAll" />
                          </Icon>
                        </Button>
                      </div>
                      <LicenseFilters
                        activeFilters={activeFilters.state}
                        data={data}
                        filterHandlers={getFilterHandlers()}
                      />
                    </form>
                  </Pane>
                }
                <Pane
                  actionMenu={({ onToggle }) => {
                    const numSelectedLicenses = Object.values(selectedLicenses).filter(item => item === true).length;
                    return (
                      <>
                        <IfPermission perm="ui-licenses.licenses.edit">
                          <Button
                            buttonStyle="dropdownItem"
                            id="clickable-dropdown-create-license"
                            onClick={goToNew}
                          >
                            <Icon icon="plus-sign">
                              <FormattedMessage id="stripes-smart-components.new" />
                            </Icon>
                          </Button>
                        </IfPermission>
                        <Button
                          buttonStyle="dropdownItem"
                          disabled={numSelectedLicenses === 0}
                          id="export-licenses-csv"
                          onClick={() => {
                            setShowExportLicenseAsCSVModal(true);
                            onToggle();
                          }}
                        >
                          <Icon icon="download">
                            <FormattedMessage id="ui-licenses.export.csv.label" values={{ count: numSelectedLicenses }} />
                          </Icon>
                        </Button>
                      </>
                    );
                  }}
                  appIcon={<AppIcon app="licenses" />}
                  defaultWidth="fill"
                  firstMenu={
                    !filterPaneIsVisible ?
                      (
                        <PaneMenu>
                          <ExpandFilterPaneButton
                            filterCount={filterCount}
                            onClick={toggleFilterPane}
                          />
                        </PaneMenu>
                      )
                      :
                      null
                  }
                  id="pane-license-list"
                  noOverflow
                  padContent={false}
                  paneSub={
                    source?.loaded() ?
                      <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count: source.totalCount() }} />
                      :
                      <FormattedMessage id="stripes-smart-components.searchCriteria" />
                  }
                  paneTitle={<FormattedMessage id="ui-licenses.meta.title" />}
                >
                  <MultiColumnList
                    autosize
                    columnMapping={{
                      selected: ' ',
                      name: <FormattedMessage id="ui-licenses.prop.name" />,
                      type: <FormattedMessage id="ui-licenses.prop.type" />,
                      status: <FormattedMessage id="ui-licenses.prop.status" />,
                      startDate: <FormattedMessage id="ui-licenses.prop.startDate" />,
                      endDate: <FormattedMessage id="ui-licenses.prop.endDate" />
                    }}
                    columnWidths={{
                      selected: 40,
                      name: 500,
                      type: 150,
                      status: 150,
                      startDate: 120,
                      endDate: 120
                    }}
                    contentData={contentData}
                    formatter={{
                      selected: license => (
                        <Checkbox
                          checked={!!(selectedLicenses[license.id])}
                          name={`selected-${license.id}`}
                          onChange={() => toggleLicenseSelection(license.id)}
                          onClick={e => e.stopPropagation()}
                        />
                      ),
                      name: license => {
                        const iconKey = license?.status?.value === statuses.EXPIRED || license?.status?.value === statuses.REJECTED ? 'inactiveLicense' : 'app';
                        return (
                          <AppIcon
                            app="licenses"
                            iconAlignment="baseline"
                            iconKey={iconKey}
                            size="small"
                          >
                            <div style={{ overflowWrap: 'break-word', width: 460 }}>
                              {license.name}
                            </div>
                          </AppIcon>
                        );
                      },
                      type: license => license.type?.label,
                      status: license => license.status?.label,
                      startDate: license => (license.startDate ? <FormattedUTCDate value={license.startDate} /> : ''),
                      endDate: license => <LicenseEndDate license={license} />,
                    }}
                    hasMargin
                    id="list-licenses"
                    isEmptyMessage={
                      source ? (
                        <div data-test-licenses-no-results-message>
                          <SearchAndSortNoResultsMessage
                            filterPaneIsVisible
                            searchTerm={query.query ?? ''}
                            source={source}
                            toggleFilterPane={toggleFilterPane}
                          />
                        </div>
                      ) : '...'
                    }
                    isSelected={({ item }) => item.id === selectedRecordId}
                    onHeaderClick={onSort}
                    onNeedMoreData={onNeedMoreData}
                    rowProps={{
                      labelStrings: ({ rowData }) => [
                        rowData.name,
                        rowData.type?.label,
                        rowData.status?.label,
                      ],
                      to: id => `/licenses/${id}${searchString}`,
                    }}
                    rowUpdater={license => selectedLicenses[license.id]}
                    sortDirection={sortDirection}
                    sortOrder={sortOrder}
                    totalCount={count}
                    virtualize
                    visibleColumns={['selected', 'name', 'type', 'status', 'startDate', 'endDate']}
                  />
                </Pane>
                {children}
                {showExportLicenseAsCSVModal &&
                  <ExportLicenseAsCSVModal
                    onClose={() => setShowExportLicenseAsCSVModal(false)}
                    onCompareLicenseTerms={onCompareLicenseTerms}
                    selectedLicenses={Object.keys(selectedLicenses).filter(item => selectedLicenses[item] === true)}
                    terms={data.terms}
                  />
                }
              </PersistedPaneset>
            );
          }
        }
        </SearchAndSortQuery>
      </div>
    </HasCommand>
  );
};

Licenses.propTypes = propTypes;
export default Licenses;
