import { MemoryRouter } from 'react-router-dom';

import { Button, Pane, renderWithIntl } from '@folio/stripes-erm-testing';
import AmendmentForm from './AmendmentForm';
import {
  data,
  handlers,
  initialValues,
  isLoading,
} from './testResources';
import translationsProperties from '../../../test/helpers';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicensesContexts: jest.fn(() => ({ data: [] }))
}));

jest.mock('../formSections/AmendmentFormInfo', () => () => <div>AmendmentFormInfo</div>);
jest.mock('../formSections/FormSupplementaryDocs', () => () => <div>FormSupplementaryDocs</div>);
jest.mock('../formSections/FormCoreDocs', () => () => <div>FormCoreDocs</div>);

const onSubmit = jest.fn();

let renderComponent;
describe('AmendmentForm', () => {
  describe('AmendmentForm with data ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <AmendmentForm
            data={data}
            handlers={handlers}
            initialValues={initialValues}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
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

    it('renders the FormCoreDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormCoreDocs')).toBeInTheDocument();
    });

    it('renders CustomPropertiesEdit component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CustomPropertiesEdit')).toBeInTheDocument();
    });

    it('renders the FormSupplementaryDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormSupplementaryDocs')).toBeInTheDocument();
    });

    test('renders Cancel button', async () => {
      await Button('Cancel').exists();
    });

    test('renders Save and close button', async () => {
      // Will be disabled because no changes were made
      await Button('Save and close').has({ disabled: true });
    });
  });

  describe('LoadingView', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <AmendmentForm
            initialValues={initialValues}
            isLoading
            onSubmit={onSubmit}
          />
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
