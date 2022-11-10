import React from 'react';

import { TestForm, renderWithIntl } from '@folio/stripes-erm-testing';
import { Accordion } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import initialValues from './testResources';
import FormCoreDocs from './FormCoreDocs';

const onSubmitMock = jest.fn();
const onDownloadFileMock = jest.fn();
const onUploadFileMock = jest.fn();
const onCloseMock = jest.fn();

describe('FormCoreDocs', () => {
  let renderComponent;
  describe('with initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <FormCoreDocs
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormDocs"
            initialValues={initialValues}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Core documents Accordion', async () => {
      await Accordion('Core documents').exists();
    });

    it('renders the DocumentsFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DocumentsFieldArray')).toBeInTheDocument();
    });
  });

  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <FormCoreDocs
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormDocs"
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Core documents Accordion', async () => {
      await Accordion('Core documents').exists();
    });

    it('renders the DocumentsFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DocumentsFieldArray')).toBeInTheDocument();
    });
  });
});
