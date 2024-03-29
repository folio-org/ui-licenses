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

    it('renders the AmendmentInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('AmendmentInfo')).toBeInTheDocument();
    });

    it('renders the AmendmentLicense component', () => {
      const { getByText } = renderComponent;
      expect(getByText('AmendmentLicense')).toBeInTheDocument();
    });

    it('renders the CoreDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CoreDocs')).toBeInTheDocument();
    });

    it('renders the LicenseAgreements component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseAgreements')).toBeInTheDocument();
    });

    it('renders the LicenseAmendments component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseAmendments')).toBeInTheDocument();
    });

    it('renders the SupplementaryDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SupplementaryDocs')).toBeInTheDocument();
    });

    it('renders the CustomPropertiesView component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CustomPropertiesView')).toBeInTheDocument();
    });

    test('clicking and calling the delete button under the Actions dropdown', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Delete').click();
      });

      expect(handlers.onDelete).toHaveBeenCalled();
    });

    test('clicking the edit/duplicate/delete buttons under the Actions dropdown', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Edit').click();
        await Button('Duplicate').click();
        await Button('Delete').click();
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
