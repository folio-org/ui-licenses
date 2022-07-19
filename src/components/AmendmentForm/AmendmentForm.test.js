import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Button, Pane } from '@folio/stripes-testing';
import AmendmentForm from './AmendmentForm';
import {
  data,
  handlers,
  initialValues,
  isLoading,
} from './testResources';
import translationsProperties from '../../../test/helpers';


jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  LoadingView: () => <div>LoadingView</div>,
}));

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicensesContexts: jest.fn(() => ({ data: [] }))
}));

jest.mock('../formSections/AmendmentFormInfo', () => () => <div>AmendmentFormInfo</div>);

const onSubmit = jest.fn();

let renderComponent;
describe('AmendmentForm', () => {
  describe('AmendmentForm with data ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm initialValues={initialValues} onSubmit={onSubmit}>
            <AmendmentForm
              data={data}
              handlers={handlers}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          </TestForm>
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the expected New amendment Pane', async () => {
      await Pane('New amendment').is({ visible: true });
    });

    it('renders the AmendmentFormInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('AmendmentFormInfo')).toBeInTheDocument();
    });

    test('renders Collapse all button', async () => {
      await Button('Collapse all').exists();
    });

    it('renders Core documents accordion', () => {
      const { getByText } = renderComponent;
      expect(getByText('Core documents')).toBeInTheDocument();
    });

    it('renders empty core documents message', () => {
      const { getByText } = renderComponent;
      expect(getByText('No core documents have been added.')).toBeInTheDocument();
    });

    test('renders Add core document button', async () => {
      await Button('Add core document').exists();
    });

    it('renders CustomPropertiesEdit component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CustomPropertiesEdit')).toBeInTheDocument();
    });

    it('renders Supplementary documents accordion', () => {
      const { getByText } = renderComponent;
      expect(getByText('Supplementary documents')).toBeInTheDocument();
    });

    it('renders empty supplementary documents message', () => {
      const { getByText } = renderComponent;
      expect(getByText('No supplementary documents have been added')).toBeInTheDocument();
    });

    test('renders Add supplementary document button', async () => {
      await Button('Add supplementary document').exists();
    });

    test('renders Cancel button', async () => {
      await Button('Cancel').exists();
    });

    test('renders Submit button', async () => {
      await Button('Submit').exists();
    });
  });
  describe('LoadingView', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm initialValues={initialValues} onSubmit={onSubmit}>
            <AmendmentForm
              isLoading
              onSubmit={onSubmit}
            />
          </TestForm>
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('renders the LoadingView component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LoadingView')).toBeInTheDocument();
    });
  });
});
