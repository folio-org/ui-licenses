import PropTypes from 'prop-types';
import { Button } from '@folio/stripes/components';
import { ResponsiveButtonGroup } from '@k-int/stripes-kint-components';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { urls } from '../utils';

// A consistent component designed to allow switching between the ui-agreements top level routes
const RouteSwitcher = ({ primary }) => {
  const { pathname } = useLocation();
  let selectedIndex;

  switch (primary) {
    case 'licenses':
      selectedIndex = 0;
      break;
    case 'amendments':
      selectedIndex = 1;
      break;
    default:
      break;
  }

  // Render agreement search options
  return (
    <ResponsiveButtonGroup
      fullWidth
      selectedIndex={selectedIndex}
    >
      <Button
        key="clickable-nav-licenses"
        id="clickable-nav-licenses"
        to={(pathname?.startsWith('/licenses') && !pathname?.startsWith('/licenses/amendments')) ? null : urls.licenses()}
      >
        <FormattedMessage id="ui-licenses.licenses" />
      </Button>
      <Button
        key="clickable-nav-amendments"
        id="clickable-nav-amendments"
        to={pathname?.startsWith('/licenses/amendments') ? null : urls.amendments()}
      >
        <FormattedMessage id="ui-licenses.amendments" />
      </Button>
    </ResponsiveButtonGroup>
  );
};

RouteSwitcher.propTypes = {
  primary: PropTypes.string
};

export default RouteSwitcher;
