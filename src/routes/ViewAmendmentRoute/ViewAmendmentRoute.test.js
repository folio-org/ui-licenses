import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { noop } from 'lodash';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { Button as MockStripesButton } from '@folio/stripes/components';
import { Button, renderWithIntl } from '@folio/stripes-erm-testing';
import { handlers, location, resources, okapi, mockButtons, historyPushMock } from './testResources';

import translationsProperties from '../../../test/helpers';
import ViewAmendmentRoute from './ViewAmendmentRoute';

// Same approach as ViewLicenseRoute... playing around with an array of buttons we can then test for
// altogether instead of writing individual tests
jest.mock('../../components/Amendment', () => (props) => (
  <>
    Amendment
    {mockButtons.map(({ handlerKey, label }) => (
      <MockStripesButton
        key={`mock-button-label-${label}`}
        onClick={props.handlers[handlerKey]}
      >
        {label}
      </MockStripesButton>
    ))}
  </>
));

const hasPermMock = jest.fn();

// TODO this seems totally wrong to me
const data = {
  handlers,
  history: {
    push: historyPushMock
  },
  location,
  mutator: {
    license: {
      PUT: noop
    }
  },
  match: {
    params: {
      amendmentId: 'd758b0e4-1bcd-43b6-a6aa-99a12f7a402e…',
      id: '766aea02-9071-4cec-a6ef-3ed8208194de'
    },
  },
  resources: {
    resources
  },
  stripes: {
    hasPerm: hasPermMock,
    okapi
  }
};

describe('ViewAmendmentRoute', () => {
  describe('rendering the ViewAmendmentRoute', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <ViewAmendmentRoute {...data} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Amendment component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Amendment')).toBeInTheDocument();
    });

    describe.each(mockButtons)('Testing $label', ({ callback, handlerKey: _hk, label }) => {
      test(`renders the ${label}`, async () => {
        const { getByText } = renderComponent;
        expect(getByText(label)).toBeInTheDocument();
      });

      if (callback) {
        describe(`Clicking ${label}`, () => {
          beforeEach(async () => {
            historyPushMock.mockClear();
            await waitFor(async () => {
              await Button(label).click();
            });
          });

          test(`triggers the ${label} callback`, async () => {
            await waitFor(() => {
              expect(callback).toHaveBeenCalled();
            });
          });
        });
      }
    });
  });
});
