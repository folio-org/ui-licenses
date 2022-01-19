import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion } from '@folio/stripes-testing';
import { data, initialValues } from './testResources';
import translationsProperties from '../../../../test/helpers';
import FormTerms from './FormTerms';

jest.mock('@folio/stripes-erm-components', () => ({
    ...jest.requireActual('@folio/stripes-erm-components'),
    FormCustomProperties: () => <div>FormCustomProperties</div>,
  }));

const onSubmitMock = jest.fn();
const onDownloadFileMock = jest.fn();
const onUploadFileMock = jest.fn();
const onCloseMock = jest.fn();
const onToggleMock = jest.fn();

describe('FormTerms', () => {
  let renderComponent;
  describe('with initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <FormTerms
            data={data}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormTerms"
            initialValues={initialValues}
            onToggle={onToggleMock}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Terms Accordion', async () => {
        await Accordion('Terms').exists();
    });

    it('renders the FormCustomProperties component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormCustomProperties')).toBeInTheDocument();
    });
  });

  describe('with no initialValues', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmitMock}>
          <FormTerms
            data={data}
            handlers={{
              onClose: onCloseMock,
              onDownloadFile: onDownloadFileMock,
              onUploadFile: onUploadFileMock
            }}
            id="licenseFormTerms"
            onToggle={onToggleMock}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Terms Accordion', async () => {
        await Accordion('Terms').exists();
    });

    it('renders the FormCustomProperties component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FormCustomProperties')).toBeInTheDocument();
    });
  });
});
