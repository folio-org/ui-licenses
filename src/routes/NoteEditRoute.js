import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

import { NoteEditPage } from '@folio/stripes/smart-components';

import { formatNoteReferrer } from '../components/utils';

export default class NoteEditRoute extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        noteId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    const {
      location,
      match,
      history,
    } = this.props;

    return (
      <NoteEditPage
        domain="licenses"
        entityTypePluralizedTranslationKeys={{ license: 'ui-licenses.licensePlural' }}
        entityTypeTranslationKeys={{ license: 'ui-licenses.license' }}
        navigateBack={history.goBack}
        noteId={match.params.noteId}
        paneHeaderAppIcon="license"
        referredEntityData={formatNoteReferrer(location.state)}
      />
    );
  }
}
