import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Col,
  FormattedUTCDate,
  Headline,
  KeyValue,
  NoValue,
  Row,
} from '@folio/stripes/components';
import { LicenseEndDate } from '@folio/stripes-erm-components';
import { urls as appUrls } from '../../utils';


export default class AmendmentLicense extends React.Component {
  static propTypes = {
    license: PropTypes.object.isRequired,
  }

  renderPrimaryOrg = () => {
    const { license: { orgs = [] } } = this.props;
    const primaryOrg = orgs.find(o => o?.primaryOrg === true);
    const primaryOrgName = primaryOrg?.org?.name || <FormattedMessage id="ui-licenses.prop.licensor.notSet" />;

    return primaryOrgName;
  }

  render() {
    const { license } = this.props;
    return (
      <>
        <Row>
          <Col xs={12}>
            <KeyValue label={
              <Headline
                margin="none"
                size="large"
                tag="h3"
              >
                <FormattedMessage id="ui-licenses.prop.parentLicense" />
              </Headline>
            }
            >
              <div data-test-amendment-license-parent-license>
                <Link to={appUrls.licenseView(license.id)}>
                  {license?.name ?? <NoValue />}
                </Link>
              </div>
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col md={3} xs={6}>
            <KeyValue label={<FormattedMessage id="ui-licenses.prop.status" />}>
              <div data-test-amendment-license-status>
                {license?.status?.label ?? <NoValue />}
              </div>
            </KeyValue>
          </Col>
          <Col md={3} xs={6}>
            <KeyValue label={<FormattedMessage id="ui-licenses.prop.startDate" />}>
              <div data-test-amendment-license-start-date>
                {license.startDate ? <FormattedUTCDate value={license.startDate} /> : <NoValue />}
              </div>
            </KeyValue>
          </Col>
          <Col md={3} xs={6}>
            <KeyValue label={<FormattedMessage id="ui-licenses.prop.endDate" />}>
              <div data-test-amendment-license-end-date>
                <LicenseEndDate license={license} />
              </div>
            </KeyValue>
          </Col>
          <Col md={3} xs={6}>
            <KeyValue label={<FormattedMessage id="ui-licenses.organizations.primary" />}>
              <div data-test-agreement-primary-org-name>
                {this.renderPrimaryOrg()}
              </div>
            </KeyValue>
          </Col>
        </Row>
      </>
    );
  }
}
