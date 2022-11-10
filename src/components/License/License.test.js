import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { useStripes } from '@folio/stripes/core';
import { Button, Pane } from '@folio/stripes-testing';
import { data, isLoading, handlers, urls } from './testResources';
import translationsProperties from '../../../test/helpers';
import License from './License';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicensesContexts: jest.fn(() => ({ data: [] }))
}));

jest.mock('../DuplicateLicenseModal', () => () => <div>DuplicateLicenseModal</div>);
jest.mock('../viewSections/CoreDocs', () => () => <div>CoreDocs</div>);
jest.mock('../viewSections/LicenseHeader', () => () => <div>LicenseHeader</div>);
jest.mock('../viewSections/LicenseInfo', () => () => <div>LicenseInfo</div>);
jest.mock('../viewSections/LicenseAgreements', () => () => <div>LicenseAgreements</div>);
jest.mock('../viewSections/LicenseAmendments', () => () => <div>LicenseAmendments</div>);
jest.mock('../viewSections/SupplementaryDocs', () => () => <div>SupplementaryDocs</div>);


describe('License', () => {
  let renderComponent;
  describe('loading pane', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <License
            components={{
              HelperComponent: () => <div>HelperComponent</div>,
              TagButton: () => <div>TagButton</div>
            }}
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

  describe('render expected components', () => {
    const { hasPerm } = useStripes();
    hasPerm.mockImplementation(() => false);
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <License
            components={{
              HelperComponent: () => <div>HelperComponent</div>,
              TagButton: () => <div>TagButton</div>
            }}
            data={data}
            handlers={handlers}
            isLoading={isLoading}
            urls={urls}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('renders the LicenseHeader component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseHeader')).toBeInTheDocument();
    });

    it('renders the LicenseInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseInfo')).toBeInTheDocument();
    });

    test('clicking the expandAll button', async () => {
      await Button('Expand all').click();
    });

    it('renders the CustomPropertiesView component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CustomPropertiesView')).toBeInTheDocument();
    });

    it('renders the LicenseAmendments component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseAmendments')).toBeInTheDocument();
    });

    it('renders the SupplementaryDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SupplementaryDocs')).toBeInTheDocument();
    });

    it('renders the NotesSmartAccordion component', () => {
      const { getByText } = renderComponent;
      expect(getByText('NotesSmartAccordion')).toBeInTheDocument();
    });

    it('renders the HelperComponent component', () => {
      const { getByText } = renderComponent;
      expect(getByText('HelperComponent')).toBeInTheDocument();
    });

    test('renders the expected Pane', async () => {
      await Pane('MR License').is({ visible: true });
    });
  });
});
