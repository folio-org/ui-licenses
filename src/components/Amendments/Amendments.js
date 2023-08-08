import React, { useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import {
  Button,
  Checkbox,
  FormattedUTCDate,
  // HasCommand,
  Icon,
  MultiColumnList,
  Pane,
  PaneMenu,
  SearchField,
  // checkScope
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
import RouteSwitcher from '../RouteSwitcher';
import { statuses } from '../../constants';
import { urls } from '../utils';

import css from '../Licenses/Licenses.css';

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

const filterPaneVisibilityKey = '@folio/licenses/amendmentsFilterPaneVisibility';

const Amendments = ({
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
  const sortOrder = query.sort ?? '';

  const searchField = useRef(null);

  const [selectedAmendments, toggleLicenseSelection] = useReducer(
    (state, amendmentId) => ({ ...state, [amendmentId]: !state[amendmentId] }),
    {}
  );
  const [showExportLicenseAsCSVModal, setShowExportLicenseAsCSVModal] = useState(false);

  const [storedFilterPaneVisibility] = useLocalStorage(filterPaneVisibilityKey, true);
  const [filterPaneIsVisible, setFilterPaneIsVisible] = useState(storedFilterPaneVisibility);
  const toggleFilterPane = () => {
    setFilterPaneIsVisible(!filterPaneIsVisible);
    writeStorage(filterPaneVisibilityKey, !filterPaneIsVisible);
  };

  // const goToNew = () => {
  //   history.push(`/licenses/create${searchString}`);
  // };

  // const shortcuts = [
  //   {
  //     name: 'new',
  //     handler: goToNew,
  //   },
  // ];

  return (
    // <HasCommand
    //   // commands={shortcuts}
    //   isWithinScope={checkScope}
    //   scope={document.body}
    // >
    <div data-test-amendments data-testid="amendments">
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
            onSort,
            getFilterHandlers,
            activeFilters,
            filterChanged,
            searchChanged,
            resetAll,
          }) => {
            const disableReset = () => (!filterChanged && !searchChanged);
            const filterCount = activeFilters.string ? activeFilters.string.split(',').length : 0;

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
                      <RouteSwitcher primary="amendments" />
                      {/* TODO: Use forthcoming <SearchGroup> or similar component */}
                      <div className={css.searchGroupWrap}>
                        <FormattedMessage id="ui-licenses.amendments.searchInputLabel">
                          {ariaLabel => (
                            <SearchField
                              aria-label={ariaLabel}
                              autoFocus
                              className={css.searchField}
                              data-test-amendment-search-input
                              id="input-amendment-search"
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
                          id="clickable-search-amendments"
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
                    </form>
                    <LicenseFilters
                      activeFilters={activeFilters.state}
                      data={data}
                      filterHandlers={getFilterHandlers()}
                    />
                  </Pane>
                }
                <Pane
                  actionMenu={({ onToggle }) => {
                    const numSelectedAmendments = Object.values(selectedAmendments).filter(item => item === true).length;
                    return (
                      <>
                        {/* <IfPermission perm="ui-licenses.licenses.edit">
                            <Button
                              buttonStyle="dropdownItem"
                              id="clickable-dropdown-create-license"
                              onClick={goToNew}
                            >
                              <Icon icon="plus-sign">
                                <FormattedMessage id="stripes-smart-components.new" />
                              </Icon>
                            </Button>
                          </IfPermission> */}
                        <Button
                          buttonStyle="dropdownItem"
                          disabled={numSelectedAmendments === 0}
                          id="export-amendments-csv"
                          onClick={() => {
                            setShowExportLicenseAsCSVModal(true);
                            onToggle();
                          }}
                        >
                          <Icon icon="download">
                            <FormattedMessage id="ui-licenses.export.csv.label" values={{ count: numSelectedAmendments }} />
                          </Icon>
                        </Button>
                      </>
                    );
                  }}
                  appIcon={<AppIcon app="licenses" iconKey="amendment" size="small" />}
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
                  paneTitle={<FormattedMessage id="ui-licenses.amendments" />}
                >
                  <MultiColumnList
                    autosize
                    columnMapping={{
                      selected: ' ',
                      name: <FormattedMessage id="ui-licenses.prop.name" />,
                      status: <FormattedMessage id="ui-licenses.prop.status" />,
                      startDate: <FormattedMessage id="ui-licenses.prop.startDate" />,
                      endDate: <FormattedMessage id="ui-licenses.prop.endDate" />
                    }}
                    columnWidths={{
                      selected: 40,
                      name: 500,
                      status: 150,
                      startDate: 120,
                      endDate: 120
                    }}
                    contentData={data.amendments}
                    formatter={{
                      selected: amendment => (
                        <Checkbox
                          checked={!!(selectedAmendments[amendment.id])}
                          name={`selected-${amendment.id}`}
                          onChange={() => toggleLicenseSelection(amendment.id)}
                          onClick={e => e.stopPropagation()}
                        />
                      ),
                      name: amendment => {
                        // const iconKey = amendment?.status?.value === statuses.EXPIRED || amendment?.status?.value === statuses.REJECTED ? 'inactiveAmendment' : 'amendment';
                        return (
                          <AppIcon
                            app="licenses"
                            iconAlignment="baseline"
                            iconKey="amendment"
                            size="small"
                          >
                            <div style={{ overflowWrap: 'break-word', width: 460 }}>
                              {amendment.name}
                            </div>
                          </AppIcon>
                        );
                      },
                      status: amendment => amendment.status?.label,
                      startDate: amendment => (amendment.startDate ? <FormattedUTCDate value={amendment.startDate} /> : ''),
                      endDate: amendment => <LicenseEndDate license={amendment} />,
                    }}
                    hasMargin
                    id="list-amendments"
                    isEmptyMessage={
                      source ? (
                        <div data-test-amendments-no-results-message>
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
                    onRowClick={(_e, row) => {
                      history.push(`${urls.amendmentNativeView(row.owner.id, row.id)}${searchString}`);
                      // history.push(`${urls.amendmentNativeView(row.id)}${searchString}`);
                    }}
                    rowProps={{
                      labelStrings: ({ rowData }) => [
                        rowData.name,
                        rowData.status?.label,
                      ],
                    }}
                    rowUpdater={amendment => selectedAmendments[amendment.id]}
                    sortDirection={sortOrder.startsWith('-') ? 'descending' : 'ascending'}
                    sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                    totalCount={count}
                    virtualize
                    visibleColumns={['selected', 'name', 'status', 'startDate', 'endDate']}
                  />
                </Pane>
                {children}
                {showExportLicenseAsCSVModal &&
                  <ExportLicenseAsCSVModal
                    onClose={() => setShowExportLicenseAsCSVModal(false)}
                    onCompareLicenseTerms={onCompareLicenseTerms}
                    selectedLicenses={Object.keys(selectedAmendments).filter(item => selectedAmendments[item] === true)}
                  />
                }
              </PersistedPaneset>
            );
          }
        }
      </SearchAndSortQuery>
    </div>
    // </HasCommand>
  );
};

Amendments.propTypes = propTypes;
export default Amendments;
