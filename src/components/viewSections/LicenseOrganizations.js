import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ViewOrganizationCard } from '@folio/stripes-erm-components';
import { Accordion, Badge, Icon, Layout } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

export default class LicenseOrganizations extends React.Component {
  static propTypes = {
    handlers: PropTypes.shape({
      onFetchCredentials: PropTypes.func,
    }),
    id: PropTypes.string.isRequired,
    license: PropTypes.shape({
      orgs: PropTypes.arrayOf(
        PropTypes.shape({
          note: PropTypes.string,
          org: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string.isRequired,
            vendorsUuid: PropTypes.string,
          }).isRequired,
          roles: PropTypes.arrayOf(
            PropTypes.shape({
              role: PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
              }).isRequired,
            })
          ),
        }),
      ),
    }).isRequired,
  };

  renderOrgList = (orgs) => {
    return orgs.map(o => {
      const { interfaces, note, org, primaryOrg, roles } = o;
      if (!org || !roles.length) return null;

      return (
        <ViewOrganizationCard
          key={`${org.orgsUuid}`}
          data-test-license-org
          fetchCredentials={this.props.handlers.onFetchCredentials}
          headerStart={
            <span>
              <AppIcon
                app="organizations"
                size="small"
              >
                <Link to={`/organizations/view/${org.orgsUuid}`}>
                  <strong>{org.name}</strong>
                </Link>
                { primaryOrg ? ' . ' : null }
                { primaryOrg ? <FormattedMessage id="ui-licenses.organizations.primary" /> : null }
              </AppIcon>
            </span>
          }
          interfaces={interfaces}
          note={note}
          roles={roles}
        />
      );
    });
  }

  renderOrganizations = () => {
    const { orgs } = this.props.license;

    if (!orgs || !orgs.length) return <FormattedMessage id="ui-licenses.emptyAccordion.organizations" />;

    return this.renderOrgList(orgs);
  }

  renderBadge = () => {
    const count = get(this.props.license, ['orgs', 'length']);
    return count !== undefined ? <Badge>{count}</Badge> : <Icon icon="spinner-ellipsis" width="10px" />;
  }

  render() {
    const { id } = this.props;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={<FormattedMessage id="ui-licenses.section.organizations" />}
      >
        <Layout className="padding-bottom-gutter">
          {this.renderOrganizations()}
        </Layout>
      </Accordion>
    );
  }
}
