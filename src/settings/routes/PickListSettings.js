import { useHistory } from 'react-router';

import { FormattedMessage } from 'react-intl';

import { Pane } from '@folio/stripes/components';

import { EditableRefdataCategoryList } from '@k-int/stripes-kint-components';
import { REFDATA_ENDPOINT } from '../../constants/endpoints';


const PickListSettings = () => {
  const history = useHistory();

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-refdata-desc"
      onClose={() => history.push('/settings/licenses')}
      paneTitle={
        <FormattedMessage id="ui-licenses.settings.pickLists" />
      }
    >
      <EditableRefdataCategoryList
        label={
          <FormattedMessage id="ui-licenses.settings.pickLists" />
        }
        labelOverrides={{
          deleteRefdataCategory: <FormattedMessage id="ui-licenses.settings.pickList.deletePickList" />,
          deleteError: (err, category) => <FormattedMessage id="ui-licenses.settings.pickList.deletePickListError" values={{ name: category.desc, error: err }} />
        }}
        refdataEndpoint={REFDATA_ENDPOINT}
      />
    </Pane>
  );
};

export default PickListSettings;
