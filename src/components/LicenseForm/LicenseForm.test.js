import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import LicenseForm from './LicenseForm';
import { data, initialValues, form } from './testResources';
import translationsProperties from '../../../test/helpers';

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  LoadingView: () => <div>LoadingView</div>,
}));

jest.mock('../formSections/LicenseFormInfo', () => () => <div>LicenseFormInfo</div>);
jest.mock('../formSections/LicenseFormInternalContacts', () => () => <div>LicenseFormInternalContacts</div>);
jest.mock('../formSections/LicenseFormOrganizations', () => () => <div>LicenseFormOrganizations</div>);
jest.mock('../formSections/FormSupplementaryDocs', () => () => <div>FormSupplementaryDocs</div>);
jest.mock('../formSections/FormTerms', () => () => <div>FormTerms</div>);
jest.mock('../formSections/FormCoreDocs', () => () => <div>FormCoreDocs</div>);

const onSubmitMock = jest.fn();
const onDownloadFileMock = jest.fn();
const onUploadFileMock = jest.fn();
const onCloseMock = jest.fn();

describe('LicenseForm', () => {
  let renderComponent;
  describe('with initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <LicenseForm
            data={data}
            form={form}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            initialValues={initialValues}
            onSubmit={onSubmitMock}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('renders the LicenseFormInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseFormInfo')).toBeInTheDocument();
    });

    it('renders the LicenseFormInternalContacts component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseFormInternalContacts')).toBeInTheDocument();
    });

    it('renders the LicenseFormOrganizations component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseFormOrganizations')).toBeInTheDocument();
    });

    it('renders the FormCoreDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormCoreDocs')).toBeInTheDocument();
    });

    it('renders the FormSupplementaryDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormSupplementaryDocs')).toBeInTheDocument();
    });

    it('renders the FormTerms component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormTerms')).toBeInTheDocument();
    });
  });

  describe('with no initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <LicenseForm
            data={data}
            form={form}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            onSubmit={onSubmitMock}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('renders the LicenseFormInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseFormInfo')).toBeInTheDocument();
    });

    it('renders the LicenseFormInternalContacts component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseFormInternalContacts')).toBeInTheDocument();
    });

    it('renders the LicenseFormOrganizations component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LicenseFormOrganizations')).toBeInTheDocument();
    });

    it('renders the FormCoreDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormCoreDocs')).toBeInTheDocument();
    });

    it('renders the FormSupplementaryDocs component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormSupplementaryDocs')).toBeInTheDocument();
    });

    it('renders the FormTerms component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormTerms')).toBeInTheDocument();
    });
  });

  describe('LoadingView', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <LicenseForm
            data={data}
            form={form}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            isLoading
            onSubmit={onSubmitMock}
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
