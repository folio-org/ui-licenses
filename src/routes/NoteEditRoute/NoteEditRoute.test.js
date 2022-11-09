import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import NoteEditRoute from './NoteEditRoute';

const history = {
  'length': 10,
  'action': 'REPLACE',
  'location': {
    'pathname': '/licenses/notes/5ef485ce-83ce-4930-b9e9-af8a7cc629eb/edit',
    'state': {
      'entityName': 'CM license',
      'entityType': 'license',
      'entityId': '88de2bd2-110e-460d-9076-7a0ccf44631f',
      'referredRecordData': '{}'
    },
    'search': '',
    'hash': '',
    'key': '4nbxxy'
  },
  'createHref': () => {},
  'push': () => {},
  'replace': () => {},
  'go': () => {},
  'goBack': () => {},
  'goForward': () => {},
  'block': () => {},
  'listen': () => {},
};

const location = {
  'pathname': '/licenses/notes/5ef485ce-83ce-4930-b9e9-af8a7cc629eb/edit',
  'state': {
    'entityName': 'CM license',
    'entityType': 'license',
    'entityId': '88de2bd2-110e-460d-9076-7a0ccf44631f',
    'referredRecordData': {}
  },
  'search': '',
  'hash': '',
  'key': '4nbxxy'
};

const match = {
  'path': '/licenses/notes/:id/edit',
  'url': '/licenses/notes/5ef485ce-83ce-4930-b9e9-af8a7cc629eb/edit',
  'isExact': true,
  'params': {
    'noteId': '5ef485ce-83ce-4930-b9e9-af8a7cc629eb'
  }
};

describe('NoteEditRoute', () => {
  describe('renders the NoteEditRoute', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <NoteEditRoute history={history} location={location} match={match} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the NoteEditPage component', () => {
      const { getByText } = renderComponent;
      expect(getByText('NoteEditPage')).toBeInTheDocument();
    });
  });
});
