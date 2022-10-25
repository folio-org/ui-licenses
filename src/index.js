import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import { useIntlKeyStore } from '@k-int/stripes-kint-components';

import { AppContextMenu, Route } from '@folio/stripes/core';
import {
  CommandList,
  HasCommand,
  KeyboardShortcutsModal,
  NavList,
  NavListItem,
  NavListSection,
  checkScope,
  defaultKeyboardShortcuts,
} from '@folio/stripes/components';

import LicensesRoute from './routes/LicensesRoute';
import CreateLicenseRoute from './routes/CreateLicenseRoute';
import EditLicenseRoute from './routes/EditLicenseRoute';
import ViewLicenseRoute from './routes/ViewLicenseRoute';

import ViewAmendmentRoute from './routes/ViewAmendmentRoute';
import CreateAmendmentRoute from './routes/CreateAmendmentRoute';
import EditAmendmentRoute from './routes/EditAmendmentRoute/EditAmendmentRoute';

import NoteCreateRoute from './routes/NoteCreateRoute';
import NoteViewRoute from './routes/NoteViewRoute';
import NoteEditRoute from './routes/NoteEditRoute';

import Settings from './settings';

import setUpRegistry from './setUpRegistry';

const App = (props) => {
  const {
    actAs,
    history,
    location,
    match: { path },
    stripes
  } = props;

  const [showKeyboardShortcutsModal, setShowKeyboardShortcutsModal] = useState(false);

  const shortcutModalToggle = (handleToggle) => {
    handleToggle();
    setShowKeyboardShortcutsModal(true);
  };


  const addKey = useIntlKeyStore(state => state.addKey);
  addKey('ui-licenses');

  const searchInput = () => {
    return location.pathname.search('/licenses') === 0 ?
      'input-license-search' :
      undefined;
  };

  const focusSearchField = () => {
    const el = document.getElementById(searchInput());
    if (el) {
      el.focus();
    } else {
      history.push(stripes.home);
    }
  };

  const shortcuts = [
    {
      name: 'search',
      handler: focusSearchField
    },
    {
      name: 'openShortcutModal',
      handler: setShowKeyboardShortcutsModal
    },
  ];

  if (actAs === 'settings') {
    return (
      <Settings {...props} />
    );
  }

  return (
    <>
      <CommandList commands={defaultKeyboardShortcuts}>
        <HasCommand
          commands={shortcuts}
          isWithinScope={checkScope}
          scope={document.body}
        >
          <AppContextMenu>
            {(handleToggle) => (
              <NavList>
                <NavListSection>
                  <NavListItem
                    id="keyboard-shortcuts-item"
                    onClick={() => { shortcutModalToggle(handleToggle); }}
                  >
                    <FormattedMessage id="ui-licenses.appMenu.keyboardShortcuts" />
                  </NavListItem>
                </NavListSection>
              </NavList>
            )}
          </AppContextMenu>
          <Switch>
            <Route component={NoteCreateRoute} exact path={`${path}/notes/create`} />
            <Route component={NoteViewRoute} exact path={`${path}/notes/:noteId`} />
            <Route component={NoteEditRoute} exact path={`${path}/notes/:noteId/edit`} />
            <Route component={CreateLicenseRoute} path={`${path}/create`} />
            <Route component={EditLicenseRoute} path={`${path}/:id/edit`} />
            <Route component={CreateAmendmentRoute} path={`${path}/:id/amendments/create`} />
            <Route component={EditAmendmentRoute} path={`${path}/:id/amendments/:amendmentId/edit`} />
            <Route component={LicensesRoute} path={`${path}/:id?`}>
              <Switch>
                <Route exact path={`${path}/:id`} render={(routeProps) => (<ViewLicenseRoute key={routeProps.match.params.id} {...routeProps} />)} />
                <Route component={ViewAmendmentRoute} exact path={`${path}/:id/amendments/:amendmentId`} />
              </Switch>
            </Route>
          </Switch>
        </HasCommand>
      </CommandList>
      {showKeyboardShortcutsModal && (
        <KeyboardShortcutsModal
          allCommands={defaultKeyboardShortcuts}
          onClose={() => { setShowKeyboardShortcutsModal(false); }}
          open
        />
      )}
    </>
  );
};

App.eventHandler = (event, _s, data) => {
  if (event === 'LOAD_STRIPES_REGISTRY') {
    // Data should contain Registry singleton:
    setUpRegistry(data);
  }

  return null;
};

App.propTypes = {
  actAs: PropTypes.string.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object.isRequired,
  stripes: PropTypes.object.isRequired,
};

export default App;
export { default as Licenses } from './components/Licenses';
