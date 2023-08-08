import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from 'react-query';

import { generateKiwtQueryParams, useKiwtSASQuery } from '@k-int/stripes-kint-components';

import { useOkapiKy, useStripes } from '@folio/stripes/core';
import { getRefdataValuesByDesc, useInfiniteFetch, downloadBlob } from '@folio/stripes-erm-components';

import View from '../../components/Amendments';
import NoPermissions from '../../components/NoPermissions';
import { AMENDMENTS_ENDPOINT } from '../../constants/endpoints';
import { useLicenseRefdata } from '../../hooks';

const RECORDS_PER_REQUEST = 100;

const LICENSE_STATUS = 'License.Status';

const AmendmentsRoute = ({
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
      LICENSE_STATUS
    ]
  });

  const amendmentsQueryParams = useMemo(() => (
    generateKiwtQueryParams({
      license: 'owner.id',
      searchKey: 'name,description',
      filterKeys: {
        status: 'status.value',
      },
      sortKeys: {
        status: 'status.label',
      },
      perPage: RECORDS_PER_REQUEST
    }, (query ?? {}))
  ), [query]);


  const {
    infiniteQueryObject: {
      error: amendmentsError,
      fetchNextPage: fetchNextLicensePage,
      isLoading: areAmendmentsLoading,
      isError: isAmendmentsError
    },
    results: amendments = [],
    total: amendmentsCount = 0
  } = useInfiniteFetch(
    ['ERM', 'Amendments', amendmentsQueryParams, AMENDMENTS_ENDPOINT],
    ({ pageParam = 0 }) => {
      const params = [...amendmentsQueryParams, `offset=${pageParam}`];
      return ky.get(`${AMENDMENTS_ENDPOINT}?${params?.join('&')}`).json();
    }
  );

  const { mutateAsync: handleCompareLicenseTerms } = useMutation(
    [`${AMENDMENTS_ENDPOINT}/compareTerms`, 'ui-licenses', 'AmendmentsRoute', 'compareTerms'],
    (payload) => ky.post(`${AMENDMENTS_ENDPOINT}/compareTerms`, { json: payload }).blob()
      .then(downloadBlob('compare_terms.csv'))
  );

  if (!hasPerms) return <NoPermissions />;

  return (
    <View
      data={{
        amendments,
        statusValues: getRefdataValuesByDesc(refdata, LICENSE_STATUS),
      }}
      history={history}
      onCompareLicenseTerms={handleCompareLicenseTerms}
      onNeedMoreData={(_askAmount, index) => fetchNextLicensePage({ pageParam: index })}
      queryGetter={queryGetter}
      querySetter={querySetter}
      searchString={location.search}
      selectedRecordId={match.params.id}
      source={{ // Fake source from useQuery return values;
        totalCount: () => amendmentsCount,
        loaded: () => !areAmendmentsLoading,
        pending: () => areAmendmentsLoading,
        failure: () => isAmendmentsError,
        failureMessage: () => amendmentsError.message
      }}
    >
      {children}
    </View>
  );
};

AmendmentsRoute.propTypes = {
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

export default AmendmentsRoute;
