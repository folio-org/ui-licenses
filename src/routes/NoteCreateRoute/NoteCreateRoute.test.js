import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import NoteCreateRoute from './NoteCreateRoute';

const history = {
  'length': 42,
  'action': 'POP',
  'location': {
    'pathname': '/licenses/notes/create',
    'search': '',
    'hash': '',
    'state': {
      'entityName': 'CM license',
      'entityType': 'license',
      'entityId': 'c4ed2be0-380a-421a-9364-0f411e9c897b',
      'referredRecordData': '{}'
    },
    'key': '64w68l'
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
  'pathname': '/licenses/notes/create',
  'search': '',
  'hash': '',
  'state': {
    'entityName': 'CM license',
    'entityType': 'license',
    'entityId': 'c4ed2be0-380a-421a-9364-0f411e9c897b',
    'referredRecordData': {}
  },
  'key': '64w68l'
};

describe('NoteCreateRoute', () => {
  describe('renders the NoteCreateRoute', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <NoteCreateRoute history={history} location={location} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the NoteCreatePage component', () => {
      const { getByText } = renderComponent;
      expect(getByText('NoteCreatePage')).toBeInTheDocument();
    });
  });
});
