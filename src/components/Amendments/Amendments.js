import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import {
  Button,
  FormattedUTCDate,
  Icon,
  MultiColumnList,
  Pane,
  PaneMenu,
  SearchField,
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';

import {
  CollapseFilterPaneButton,
  ExpandFilterPaneButton,
  PersistedPaneset,
  SearchAndSortNoResultsMessage,
  SearchAndSortQuery,
} from '@folio/stripes/smart-components';

import { LicenseEndDate, usePrevNextPagination } from '@folio/stripes-erm-components';

import AmendmentFilters from '../AmendmentFilters';
import RouteSwitcher from '../RouteSwitcher';
import { urls } from '../utils';
import { resultCount } from '../../constants';
import css from '../Licenses/Licenses.css';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  history: PropTypes.object,
  page: PropTypes.number,
  queryGetter: PropTypes.func,
  querySetter: PropTypes.func,
  searchString: PropTypes.string,
  selectedRecordId: PropTypes.string,
  source: PropTypes.object,
};

const filterPaneVisibilityKey = '@folio/licenses/amendmentsFilterPaneVisibility';
const { RESULT_COUNT_INCREMENT_MEDIUM } = resultCount;

const Amendments = ({
  children,
  data,
  history,
  queryGetter,
  querySetter,
  searchString,
  selectedRecordId,
  source,
}) => {
  const count = source?.totalCount() ?? 0;
  const query = queryGetter() ?? {};
  const sortOrder = query.sort ?? '';

  const {
    paginationMCLProps,
    paginationSASQProps
  } = usePrevNextPagination({
    count,
    pageSize: RESULT_COUNT_INCREMENT_MEDIUM
  });

  const searchField = useRef(null);

  const [storedFilterPaneVisibility] = useLocalStorage(filterPaneVisibilityKey, true);
  const [filterPaneIsVisible, setFilterPaneIsVisible] = useState(storedFilterPaneVisibility);
  const toggleFilterPane = () => {
    setFilterPaneIsVisible(!filterPaneIsVisible);
    writeStorage(filterPaneVisibilityKey, !filterPaneIsVisible);
  };

  return (
    <div data-test-amendments data-testid="amendments">
      <SearchAndSortQuery
        {...paginationSASQProps}
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
                    <AmendmentFilters
                      activeFilters={activeFilters.state}
                      data={data}
                      filterHandlers={getFilterHandlers()}
                    />
                  </Pane>
                }
                <Pane
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
                      name: <FormattedMessage id="ui-licenses.prop.name" />,
                      status: <FormattedMessage id="ui-licenses.prop.status" />,
                      startDate: <FormattedMessage id="ui-licenses.prop.startDate" />,
                      endDate: <FormattedMessage id="ui-licenses.prop.endDate" />,
                      parentLicense: <FormattedMessage id="ui-licenses.prop.parentLicense" />
                    }}
                    columnWidths={{
                      name: 500,
                      status: 150,
                      startDate: 120,
                      endDate: 120,
                      parentLicense: 350
                    }}
                    contentData={data.amendments}
                    formatter={{
                      name: amendment => {
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
                      parentLicense: amendment => amendment.owner.name,
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
                    {...paginationMCLProps}
                    onRowClick={(_e, row) => {
                      history.push(`${urls.amendmentNativeView(row.owner.id, row.id)}${searchString}`);
                    }}
                    rowProps={{
                      labelStrings: ({ rowData }) => [
                        rowData.name,
                        rowData.status?.label,
                      ],
                    }}
                    sortDirection={sortOrder.startsWith('-') ? 'descending' : 'ascending'}
                    sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                    totalCount={count}
                    visibleColumns={['name', 'status', 'startDate', 'endDate', 'parentLicense']}
                  />
                </Pane>
                {children}
              </PersistedPaneset>
            );
          }
        }
      </SearchAndSortQuery>
    </div>
  );
};

Amendments.propTypes = propTypes;
export default Amendments;
