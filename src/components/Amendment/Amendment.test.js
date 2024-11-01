import { MemoryRouter } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { Button, renderWithIntl } from '@folio/stripes-erm-testing';

import Amendment from './Amendment';
import { data, handlers, urls } from './testResources';
import translationsProperties from '../../../test/helpers';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicensesContexts: jest.fn(() => ({ data: [] }))
}));

jest.mock('../viewSections/AmendmentInfo', () => () => <div>AmendmentInfo</div>);
jest.mock('../viewSections/AmendmentLicense', () => () => <div>AmendmentLicense</div>);
jest.mock('../viewSections/CoreDocs', () => () => <div>CoreDocs</div>);
jest.mock('../viewSections/LicenseAgreements', () => () => <div>LicenseAgreements</div>);
jest.mock('../viewSections/LicenseAmendments', () => () => <div>LicenseAmendments</div>);
jest.mock('../viewSections/SupplementaryDocs', () => () => <div>SupplementaryDocs</div>);

describe('Amendment', () => {
  let renderComponent;
  describe('render expected components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Amendment
            data={data}
            handlers={handlers}
            urls={urls}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test.each([
      'AmendmentInfo',
      'AmendmentLicense',
      'CoreDocs',
      'LicenseAgreements',
      'LicenseAmendments',
      'SupplementaryDocs',
      'CustomPropertiesView'
    ])('renders the %s component', (componentText) => {
      const { getByText } = renderComponent;
      expect(getByText(componentText)).toBeInTheDocument();
    });

    describe('clicking the actions button', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
        });
      });

      describe.each([
        // This edit one should probably be from the handlers, but we have two different ways of achieving the same outcome right now... needs refactoring
        { buttonLabel: 'Edit', callback: urls.editAmendment },
        { buttonLabel: 'Duplicate', callback: handlers.onClone },
        { buttonLabel: 'Delete', callback: handlers.onDelete }
      ])('clicking the $buttonLabel button', ({ buttonLabel, callback }) => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button(buttonLabel).click();
          });
        });

        test(`${buttonLabel} handler got called`, async () => {
          await waitFor(() => {
            expect(callback).toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('loading pane', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Amendment
            data={data}
            handlers={handlers}
            isLoading
            urls={urls}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('renders the LoadingPane component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LoadingPane')).toBeInTheDocument();
    });
  });
});
