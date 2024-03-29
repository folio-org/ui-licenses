import { Accordion, renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import { data, initialValues } from './testResources';
import translationsProperties from '../../../../test/helpers';
import LicenseFormOrganizations from './LicenseFormOrganizations';

const onSubmitMock = jest.fn();
const onDownloadFileMock = jest.fn();
const onUploadFileMock = jest.fn();
const onCloseMock = jest.fn();
const onToggleMock = jest.fn();

describe('LicenseFormOrganizations', () => {
  let renderComponent;
  describe('with initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <LicenseFormOrganizations
            data={data}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormOrganizations"
            initialValues={initialValues}
            onToggle={onToggleMock}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Organizations Accordion', async () => {
      await Accordion('Organizations').exists();
    });

    it('renders the OrganizationsFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('OrganizationsFieldArray')).toBeInTheDocument();
    });
  });

  describe('with no initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <LicenseFormOrganizations
            data={data}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormOrganizations"
            onToggle={onToggleMock}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Organizations Accordion', async () => {
      await Accordion('Organizations').exists();
    });

    it('renders the OrganizationsFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('OrganizationsFieldArray')).toBeInTheDocument();
    });
  });
});
