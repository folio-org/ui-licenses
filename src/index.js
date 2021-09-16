import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
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
import EditAmendmentRoute from './routes/EditAmendmentRoute';

import NoteCreateRoute from './routes/NoteCreateRoute';
import NoteViewRoute from './routes/NoteViewRoute';
import NoteEditRoute from './routes/NoteEditRoute';

import Settings from './settings';

import setUpRegistry from './setUpRegistry';

class App extends React.Component {
  static eventHandler(event, _s, data) {
    if (event === 'LOAD_STRIPES_REGISTRY') {
      // Data should contain Registry singleton:
      setUpRegistry(data);
    }

    return null;
  }

  static propTypes = {
    actAs: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  state = {
    showKeyboardShortcutsModal: false,
  };

  changeKeyboardShortcutsModal = (modalState) => {
    this.setState({ showKeyboardShortcutsModal: modalState });
  };

  shortcutModalToggle(handleToggle) {
    handleToggle();
    this.changeKeyboardShortcutsModal(true);
  }

  searchInput = () => {
    return this.props.location.pathname.search('/licenses') === 0 ?
      'input-license-search' :
      undefined;
  }

  focusSearchField = () => {
    const { history, stripes } = this.props;
    const el = document.getElementById(this.searchInput());
    if (el) {
      el.focus();
    } else {
      history.push(stripes.home);
    }
  }

  shortcuts = [
    {
      name: 'search',
      handler: this.focusSearchField
    },
    {
      name: 'openShortcutModal',
      handler: this.changeKeyboardShortcutsModal
    },
  ];

  render() {
    const { actAs, match: { path } } = this.props;

    if (actAs === 'settings') {
      return (
        <Settings {...this.props} />
      );
    }

    return (
      <>
        <CommandList commands={defaultKeyboardShortcuts}>
          <HasCommand
            commands={this.shortcuts}
            isWithinScope={checkScope}
            scope={document.body}
          >
            <AppContextMenu>
              {(handleToggle) => (
                <NavList>
                  <NavListSection>
                    <NavListItem
                      id="keyboard-shortcuts-item"
                      onClick={() => { this.shortcutModalToggle(handleToggle); }}
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
                  <Route exact path={`${path}/:id`} render={(props) => (<ViewLicenseRoute key={props.match.params.id} {...props} />)} />
                  <Route component={ViewAmendmentRoute} exact path={`${path}/:id/amendments/:amendmentId`} />
                </Switch>
              </Route>
            </Switch>
          </HasCommand>
        </CommandList>
        {this.state.showKeyboardShortcutsModal && (
          <KeyboardShortcutsModal
            allCommands={defaultKeyboardShortcuts}
            onClose={() => { this.changeKeyboardShortcutsModal(false); }}
            open
          />
        )}
      </>
    );
  }
}

export default App;
export { default as Licenses } from './components/Licenses';
