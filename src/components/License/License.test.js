import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { mockErmComponents, renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { useStripes } from '@folio/stripes/core';
import { screen } from '@testing-library/react';
import { Button, Pane } from '@folio/stripes-testing';
import { data, isLoading, handlers, urls } from './testResources';
import translationsProperties from '../../../test/helpers';
import License from './License';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicensesContexts: jest.fn(() => ({ data: [] }))
}));

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  LoadingPane: () => <div>LoadingPane</div>,
}));

jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  NotesSmartAccordion: () => <div>NotesSmartAccordion</div>,
}));

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  ...mockErmComponents
}));

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  CustomPropertiesView: () => <div>CustomPropertiesView</div>,
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

    test('clicking the Edit/Duplicate button in Actions dropdown', async () => {
      await Button('Actions').click();
      await Button('Edit').click();
      await Button('Duplicate').click();
    });

    it('renders the TagButton component', () => {
      const { getByText } = renderComponent;
      expect(getByText('TagButton')).toBeInTheDocument();
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
      await Button('stripes-components.expandAll').click();
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
