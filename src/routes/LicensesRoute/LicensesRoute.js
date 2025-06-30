import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { useMutation, useQuery } from 'react-query';

import { generateKiwtQueryParams, useKiwtSASQuery, usePrevNextPagination } from '@k-int/stripes-kint-components';

import { useOkapiKy, useStripes } from '@folio/stripes/core';
import {
  getRefdataValuesByDesc,
  useTags,
  downloadBlob,
} from '@folio/stripes-erm-components';

import View from '../../components/Licenses';
import NoPermissions from '../../components/NoPermissions';

import { LICENSES_ENDPOINT, resultCount } from '../../constants';
import { useLicenseRefdata } from '../../hooks';

const { RESULT_COUNT_INCREMENT_MEDIUM } = resultCount;

const [
  DOCUMENT_AT_TYPE,
  LICENSE_STATUS,
  LICENSE_TYPE,
  LICENSE_ORG_ROLE,
] = [
  'DocumentAttachment.AtType',
  'License.Status',
  'License.Type',
  'LicenseOrg.Role',
];

const LicensesRoute = ({
  children,
  history,
  location,
  match,
}) => {
  const ky = useOkapiKy();
  const stripes = useStripes();
  const hasPerms = stripes.hasPerm('ui-licenses.licenses.view');
  const searchField = useRef();

  const { query, queryGetter, querySetter } = useKiwtSASQuery();
  const { currentPage } = usePrevNextPagination();

  useEffect(() => {
    if (searchField.current) {
      searchField.current.focus();
    }
  }, []); // This isn't particularly great, but in the interests of saving time migrating, it will have to do

  const refdata = useLicenseRefdata({
    desc: [
      DOCUMENT_AT_TYPE,
      LICENSE_STATUS,
      LICENSE_TYPE,
      LICENSE_ORG_ROLE,
    ]
  });

  const { data: { tags = [] } = {} } = useTags();

  const licensesQueryParams = useMemo(() => (
    generateKiwtQueryParams({
      searchKey: 'name,alternateNames.name,description',
      filterKeys: {
        org: 'orgs.org',
        role: 'orgs.roles.role',
        status: 'status.value',
        tags: 'tags.value',
        type: 'type.value'
      },
      sortKeys: {
        status: 'status.label',
        type: 'type.label',
      },
      page: currentPage,
      perPage: RESULT_COUNT_INCREMENT_MEDIUM
    }, (query ?? {}))
  ), [query, currentPage]);


  const {
    data: { results: licenses = [], totalRecords: licensesCount = 0 } = {},
    error: licensesError,
    isLoading: areLicensesLoading,
    isError: isLicensesError
  } = useQuery(
    ['ERM', 'Licenses', licensesQueryParams, LICENSES_ENDPOINT],
    () => {
      const params = [...licensesQueryParams];
      return ky.get(`${LICENSES_ENDPOINT}?${params?.join('&')}`).json();
    }
  );

  const { mutateAsync: handleCompareLicenseTerms } = useMutation(
    [`${LICENSES_ENDPOINT}/compareTerms`, 'ui-licenses', 'LicensesRoute', 'compareTerms'],
    (payload) => ky.post(`${LICENSES_ENDPOINT}/compareTerms`, { json: payload }).blob()
      .then(downloadBlob('compare_terms.csv'))
  );

  if (!hasPerms) return <NoPermissions />;

  return (
    <View
      data={{
        licenses,
        statusValues: getRefdataValuesByDesc(refdata, LICENSE_STATUS),
        typeValues: getRefdataValuesByDesc(refdata, LICENSE_TYPE),
        orgRoleValues: getRefdataValuesByDesc(refdata, LICENSE_ORG_ROLE),
        documentAtTypeValues: getRefdataValuesByDesc(refdata, DOCUMENT_AT_TYPE),
        tags
      }}
      history={history}
      onCompareLicenseTerms={handleCompareLicenseTerms}
      queryGetter={queryGetter}
      querySetter={querySetter}
      searchString={location.search}
      selectedRecordId={match.params.id}
      source={{ // Fake source from useQuery return values;
        totalCount: () => licensesCount,
        loaded: () => !areLicensesLoading,
        pending: () => areLicensesLoading,
        failure: () => isLicensesError,
        failureMessage: () => licensesError.message
      }}
    >
      {children}
    </View>
  );
};

LicensesRoute.propTypes = {
  children: PropTypes.node,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default LicensesRoute;
