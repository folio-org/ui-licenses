import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DuplicateModal } from '@folio/stripes-erm-components';

export default class DuplicateLicenseModal extends React.Component {
  render() {
    const cloneableProperties = [
      { key: 'licenseInfo', value: <FormattedMessage id="ui-licenses.duplicateLicenseModal.licenseInfo" /> },
      { key: 'internalContacts', value: <FormattedMessage id="ui-licenses.duplicateLicenseModal.internalContacts" /> },
      { key: 'organizations', value: <FormattedMessage id="ui-licenses.duplicateLicenseModal.organizations" /> },
      { key: 'coreDocs', value : <FormattedMessage id="ui-licenses.duplicateLicenseModal.coreDocs" /> },
      { key: 'terms', value: <FormattedMessage id="ui-licenses.duplicateLicenseModal.terms" /> },
      { key: 'supplementaryDocs', value: <FormattedMessage id="ui-licenses.duplicateLicenseModal.supplementaryDocs" /> },
    ];

    return (
      <DuplicateModal
        {...this.props}
        cloneableProperties={cloneableProperties}
        translationKey="license"
      />
    );
  }
}
