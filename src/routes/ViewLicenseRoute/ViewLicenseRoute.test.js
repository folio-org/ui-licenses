import { MemoryRouter } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { Button as MockStripesButton } from '@folio/stripes/components';
import { Button, renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../test/helpers';
import ViewLicenseRoute from './ViewLicenseRoute';

import { mockButtons, historyPushMock } from './testResources';

jest.mock('../../components/License', () => (props) => (
  <>
    License
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

const data = {
  history: {
    push: historyPushMock
  },
  location: {
    'pathname': '/licenses/766aea02-9071-4cec-a6ef-3ed8208194de',
    'search': '?filters=status.active&sort=name',
  },
  match: {
    'path': '/licenses/:id',
    'url': '/licenses/e73d0d15-17ca-43cc-a4ee-3e800ac1c4d5',
    'isExact': true,
    'params': {
      'id': 'e73d0d15-17ca-43cc-a4ee-3e800ac1c4d5'
    }
  },
};

describe('ViewLicenseRoute', () => {
  describe('rendering the ViewLicenseRoute', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <ViewLicenseRoute {...data} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the License component', () => {
      const { getByText } = renderComponent;
      expect(getByText('License')).toBeInTheDocument();
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
