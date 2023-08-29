
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { CUSTPROP_ENDPOINT } from '../constants';

const useLicensesContexts = () => {
  const ky = useOkapiKy();

  const path = `${CUSTPROP_ENDPOINT}/contexts`;

  return useQuery(
    [path, 'ui-licenses', 'settings', 'custpropContexts'],
    () => ky(path).json()
  );
};

export default useLicensesContexts;
