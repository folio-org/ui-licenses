import React from 'react';
import PropTypes from 'prop-types';
import { LicenseCard } from '@folio/stripes-erm-components';

import css from './LicenseHeader.css';

const propTypes = {
  license: PropTypes.object,
};

export default function LicenseHeader({ license }) {
  return (
    <LicenseCard
      className={css.licenseHeader}
      license={license}
      renderName={false}
    />
  );
}

LicenseHeader.propTypes = propTypes;
LicenseHeader.defaultProps = {
  license: {},
};
