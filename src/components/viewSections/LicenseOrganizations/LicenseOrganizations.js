import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ViewOrganizationCard } from '@folio/stripes-erm-components';
import { Accordion, Badge, Icon, Layout } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

const LicenseOrganizations = ({
  id,
  license
}) => {
  const renderOrgList = (orgs) => {
    return orgs.map(o => {
      const { interfaces, note, org, primaryOrg, roles } = o;
      if (!org || !roles.length) return null;

      return (
        <ViewOrganizationCard
          key={`${org.orgsUuid}`}
          data-test-license-org
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
          org={org}
          roles={roles}
        />
      );
    });
  };

  const renderOrganizations = () => {
    const orgs = license?.orgs;
    if (!orgs || !orgs.length) return <FormattedMessage id="ui-licenses.emptyAccordion.organizations" />;

    return renderOrgList(orgs);
  };

  const renderBadge = () => {
    const count = license?.orgs?.length;
    return count !== undefined ? <Badge>{count}</Badge> : <Icon icon="spinner-ellipsis" width="10px" />;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      id={id}
      label={<FormattedMessage id="ui-licenses.section.organizations" />}
    >
      <Layout className="padding-bottom-gutter">
        {renderOrganizations()}
      </Layout>
    </Accordion>
  );
};

LicenseOrganizations.propTypes = {
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

export default LicenseOrganizations;
