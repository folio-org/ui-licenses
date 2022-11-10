import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Card,
  Layout,
  Tooltip
} from '@folio/stripes/components';

import { LicenseCard } from '@folio/stripes-erm-components';

import { AppIcon, Pluggable } from '@folio/stripes/core';

// This must return a function to render a link button

const propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }),
  onResourceSelected: PropTypes.func,
  resource: PropTypes.object
};

const LicenseLookup = ({ disabled, id, input: { name, value }, onResourceSelected, resource }) => {
  let triggerButton = useRef(null);

  const renderLicense = () => {
    return (
      <div data-test-license-card-name>
        <LicenseCard license={resource} />
      </div>
    );
  };

  const renderEmpty = () => (
    <div>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="ui-licenses.license.noLicenseLinked" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="ui-licenses.license.linkLicenseToStart" />
      </Layout>
    </div>
  );

  const renderLinkLicenseButton = (v) => (
    <Pluggable
      dataKey={id}
      onLicenseSelected={onResourceSelected}
      renderTrigger={(pluggableRenderProps) => {
        triggerButton = pluggableRenderProps.buttonRef;

        const buttonProps = {
          'buttonStyle': v ? 'default' : 'primary',
          'buttonRef': triggerButton,
          'disabled': disabled,
          'id': `${id}-find-license-btn`,
          'marginBottom0': true,
          'name': name,
          'onClick': pluggableRenderProps.onClick
        };

        if (value) {
          return (
            <Tooltip
              id={`${id}-license-button-tooltip`}
              text={<FormattedMessage id="ui-licenses.license.replaceLicenseSpecific" values={{ licenseName: resource?.name }} />}
              triggerRef={triggerButton}
            >
              {({ ariaIds }) => (
                <Button
                  aria-labelledby={ariaIds.text}
                  {...buttonProps}
                >
                  <FormattedMessage id="ui-licenses.license.replaceLicense" />
                </Button>
              )}
            </Tooltip>
          );
        }

        return (
          <Button
            {...buttonProps}
          >
            <FormattedMessage id="ui-licenses.license.linkLicense" />
          </Button>
        );
      }}
      type="find-license"
    >
      <FormattedMessage id="ui-licenses.license.noFindLicensePlugin" />
    </Pluggable>
  );

  return (
    <Card
      cardStyle={value ? 'positive' : 'negative'}
      headerEnd={renderLinkLicenseButton(value)}
      headerStart={(
        <AppIcon app="licenses" size="small">
          <strong>
            <FormattedMessage id="ui-licenses.license" />
          </strong>
        </AppIcon>
      )}
      id={id}
      roundedBorder
    >
      {value ? renderLicense() : renderEmpty()}
    </Card>
  );
};

LicenseLookup.propTypes = propTypes;

export default LicenseLookup;
