import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useStripes } from '@folio/stripes/core';
import { Pane, Select } from '@folio/stripes/components';
import { EditableRefdataList } from '@k-int/stripes-kint-components';
import { REFDATA_ENDPOINT } from '../../constants/endpoints';
import { useLicenseRefdata } from '../../hooks';

const PickListValues = () => {
  const intl = useIntl();

  const rdcOptions = useLicenseRefdata()?.map(rdv => ({ value: rdv.desc, label: rdv.desc }));

  const [selectedPickList, setSelectedPickList] = useState('');
  const history = useHistory();

  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-licenses.picklists.manage');
  const displayConditions = {
    create: perm,
    delete: perm,
    edit: perm
  };

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-refdata"
      onClose={() => history.push('/settings/erm')}
      paneTitle={
        <FormattedMessage id="ui-licenses.settings.pickListValues" />
      }
    >
      <Select
        dataOptions={[{ value: '', label: intl.formatMessage({ id: 'ui-licenses.settings.pickListSelect' }) }, ...rdcOptions]}
        label={<FormattedMessage id="ui-licenses.settings.pickList" />}
        onChange={(e) => setSelectedPickList(e.target.value)}
        value={selectedPickList}
      />
      {selectedPickList && (
        <EditableRefdataList
          desc={selectedPickList}
          displayConditions={displayConditions}
          label={
            <FormattedMessage id="ui-licenses.settings.pickListValues" />
          }
          refdataEndpoint={REFDATA_ENDPOINT}
        />
      )}
    </Pane>
  );
};

export default PickListValues;
