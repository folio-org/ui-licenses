import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from 'react-query';

import { generateKiwtQueryParams, refdataOptions, useRefdata } from '@k-int/stripes-kint-components';

import { stripesConnect, useOkapiKy } from '@folio/stripes/core';
import { useInfiniteFetch, useTags } from '@folio/stripes-erm-components';

import View from '../components/Licenses';
import { getRefdataValuesByDesc } from '../components/utils';
import NoPermissions from '../components/NoPermissions';
import { LICENSES_ENDPOINT, REFDATA_ENDPOINT } from '../constants/endpoints';

const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;
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
  mutator,
  resources,
  stripes
}) => {
  const ky = useOkapiKy();
  const hasPerms = stripes.hasPerm('ui-licenses.licenses.view');
  const searchField = useRef();


  useEffect(() => {
    if (searchField.current) {
      searchField.current.focus();
    }
  }, []); // This isn't particularly great, but in the interests of saving time migrating, it will have to do

  const refdata = useRefdata({
    desc: [
      LICENSE_STATUS,
      LICENSE_TYPE,
      LICENSE_ORG_ROLE,
    ],
    endpoint: REFDATA_ENDPOINT,
    options: { ...refdataOptions, sort: [{ path: 'desc' }] }
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
      perPage: INITIAL_RESULT_COUNT
    }, (resources?.query ?? {}))
  ), [resources?.query]);


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

  const querySetter = ({ nsValues }) => {
    mutator.query.update(nsValues);
  };

  const queryGetter = () => {
    return resources?.query ?? {};
  };

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

LicensesRoute.manifest = Object.freeze({
  query: { initialValue: {} },
});

LicensesRoute.propTypes = {
  children: PropTypes.node,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  mutator: PropTypes.object,
  resources: PropTypes.object,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
    logger: PropTypes.object,
    okapi: PropTypes.shape({
      tenant: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default stripesConnect(LicensesRoute);
