import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from 'react-query';

import { generateKiwtQueryParams, useKiwtSASQuery } from '@k-int/stripes-kint-components';

import { useOkapiKy, useStripes } from '@folio/stripes/core';
import { getRefdataValuesByDesc, useInfiniteFetch, useTags } from '@folio/stripes-erm-components';

import View from '../components/Licenses';
import NoPermissions from '../components/NoPermissions';
import { LICENSES_ENDPOINT } from '../constants/endpoints';
import { useLicenseRefdata } from '../hooks';

const RECORDS_PER_REQUEST = 100;

const [
  LICENSE_STATUS,
  LICENSE_TYPE,
  LICENSE_ORG_ROLE,
] = [
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

  useEffect(() => {
    if (searchField.current) {
      searchField.current.focus();
    }
  }, []); // This isn't particularly great, but in the interests of saving time migrating, it will have to do

  const refdata = useLicenseRefdata({
    desc: [
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
      perPage: RECORDS_PER_REQUEST
    }, (query ?? {}))
  ), [query]);


  const {
    infiniteQueryObject: {
      error: licensesError,
      fetchNextPage: fetchNextLicensePage,
      isLoading: areLicensesLoading,
      isError: isLicensesError
    },
    results: licenses = [],
    total: licensesCount = 0
  } = useInfiniteFetch(
    [LICENSES_ENDPOINT, licensesQueryParams, 'ui-licenses', 'LicensesRoute', 'getLicenses'],
    ({ pageParam = 0 }) => {
      const params = [...licensesQueryParams, `offset=${pageParam}`];
      return ky.get(encodeURI(`${LICENSES_ENDPOINT}?${params?.join('&')}`)).json();
    }
  );

  const downloadBlob = () => (
    blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compare_terms.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  );

  const { mutateAsync: handleCompareLicenseTerms } = useMutation(
    [`${LICENSES_ENDPOINT}/compareTerms`, 'ui-licenses', 'LicensesRoute', 'compareTerms'],
    (payload) => ky.post(`${LICENSES_ENDPOINT}/compareTerms`, { json: payload }).blob()
      .then(downloadBlob())
  );

  if (!hasPerms) return <NoPermissions />;

  return (
    <View
      data={{
        licenses,
        statusValues: getRefdataValuesByDesc(refdata, LICENSE_STATUS),
        typeValues: getRefdataValuesByDesc(refdata, LICENSE_TYPE),
        orgRoleValues: getRefdataValuesByDesc(refdata, LICENSE_ORG_ROLE),
        tags
      }}
      history={history}
      onCompareLicenseTerms={handleCompareLicenseTerms}
      onNeedMoreData={(_askAmount, index) => fetchNextLicensePage({ pageParam: index })}
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
