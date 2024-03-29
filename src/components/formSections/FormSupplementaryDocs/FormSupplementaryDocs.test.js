import { Accordion, renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import { data, initialValues } from './testResources';
import translationsProperties from '../../../../test/helpers';
import FormSupplementaryDocs from './FormSupplementaryDocs';

const onSubmitMock = jest.fn();
const onDownloadFileMock = jest.fn();
const onUploadFileMock = jest.fn();
const onCloseMock = jest.fn();

describe('FormSupplementaryDocs', () => {
  let renderComponent;
  describe('with initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <FormSupplementaryDocs
            data={data}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormSupplementaryDocs"
            initialValues={initialValues}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Supplementary documents Accordion', async () => {
      await Accordion('Supplementary documents').exists();
    });

    it('renders the DocumentsFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DocumentsFieldArray')).toBeInTheDocument();
    });
  });

  describe('with no initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <FormSupplementaryDocs
            data={data}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormSupplementaryDocs"
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Supplementary documents Accordion', async () => {
      await Accordion('Supplementary documents').exists();
    });

    it('renders the DocumentsFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DocumentsFieldArray')).toBeInTheDocument();
    });
  });
});
