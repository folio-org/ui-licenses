import { Accordion, renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import { data, mutators, values, initialValues } from './testResources';
import translationsProperties from '../../../../test/helpers';
import LicenseFormInternalContacts from './LicenseFormInternalContacts';

const onSubmitMock = jest.fn();
const onDownloadFileMock = jest.fn();
const onUploadFileMock = jest.fn();
const onCloseMock = jest.fn();
const onToggleMock = jest.fn();

describe('LicenseFormInternalContacts', () => {
  let renderComponent;
  describe('with initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <LicenseFormInternalContacts
            data={data}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormInternalContacts"
            initialValues={initialValues}
            mutators={mutators}
            onToggle={onToggleMock}
            values={values}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Internal contacts Accordion', async () => {
      await Accordion('Internal contacts').exists();
    });

    it('renders the InternalContactsFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('InternalContactsFieldArray')).toBeInTheDocument();
    });
  });

  describe('with no initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <LicenseFormInternalContacts
            data={data}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormInternalContacts"
            mutators={mutators}
            onToggle={onToggleMock}
            values={values}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Internal contacts Accordion', async () => {
      await Accordion('Internal contacts').exists();
    });

    it('renders the InternalContactsFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('InternalContactsFieldArray')).toBeInTheDocument();
    });
  });
});
