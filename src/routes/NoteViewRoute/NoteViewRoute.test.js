import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import NoteViewRoute from './NoteViewRoute';

const history = {
    'length': 17,
    'action': 'PUSH',
    'location': {
    'pathname': '/licenses/notes/f53f5493-fed1-4d59-809d-6a6eae2df131',
    'state': {
        'entityName': 'MR Licenses',
        'entityType': 'license',
        'entityId': '1491d1d5-09ba-4f56-8bdf-e053425b8ba3',
        'referredRecordData': '{}'
    },
    'search': '',
    'hash': '',
    'key': '5iv04i'
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
    'pathname': '/licenses/notes/f53f5493-fed1-4d59-809d-6a6eae2df131',
    'state': {
    'entityName': 'MR Licenses',
    'entityType': 'license',
    'entityId': '1491d1d5-09ba-4f56-8bdf-e053425b8ba3',
    'referredRecordData': {}
    },
    'search': '',
    'hash': '',
    'key': '5iv04i'
};

const match = {
    'path': '/licenses/notes/:noteId',
    'url': '/licenses/notes/f53f5493-fed1-4d59-809d-6a6eae2df131',
    'isExact': true,
    'params': {
    'noteId': 'f53f5493-fed1-4d59-809d-6a6eae2df131'
    }
};

describe('NoteViewRoute', () => {
  describe('renders the NoteViewRoute', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <NoteViewRoute
            history={history}
            location={location}
            match={match}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the NoteViewPage component', () => {
      const { getByText } = renderComponent;
      expect(getByText('NoteViewPage')).toBeInTheDocument();
    });
  });
});


