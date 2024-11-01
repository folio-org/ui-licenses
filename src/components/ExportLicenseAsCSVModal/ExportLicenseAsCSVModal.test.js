import { MemoryRouter } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  Button,
  Checkbox,
  Headline,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import translationsProperties from '../../../test/helpers';
import ExportLicenseAsCSVModal from './ExportLicenseAsCSVModal';

const selectedLicenses = [
  '79621132-1d05-42c2-99c6-525a15714499'
];

const onClose = jest.fn();
const onChange = jest.fn();
const onCompareLicenseTerms = jest.fn();

describe('ExportLicenseAsCSVModal', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <ExportLicenseAsCSVModal
          onChange={onChange}
          onClose={onClose}
          onCompareLicenseTerms={onCompareLicenseTerms}
          selectedLicenses={selectedLicenses}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders expected modal heading', async () => {
    await Headline('Export licenses as CSV').exists();
  });

  test('renders expected text', () => {
    const { getByText } = renderComponent;
    expect(getByText('Please select which license details to export')).toBeInTheDocument();
  });

  // TODO we can probably make these tests nicer with an each, maybe combined with the below.
  test('renders expected Select all/deselect all checkbox label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select all/deselect all')).toBeInTheDocument();
  });

  test('renders expected License information checkbox label', () => {
    const { getByText } = renderComponent;
    expect(getByText('License information')).toBeInTheDocument();
  });

  test('renders expected Terms checkbox label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Terms')).toBeInTheDocument();
  });

  test('renders expected Term names checkbox label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Term names')).toBeInTheDocument();
  });

  test.each([
    { checkboxLabel: 'Select all/deselect all', checked: false },
    { checkboxLabel: 'License information', checked: false },
    { checkboxLabel: 'Name', checked: false },
    { checkboxLabel: 'Start date', checked: false },
    { checkboxLabel: 'End date', checked: false },
    { checkboxLabel: 'Status', checked: false },
    { checkboxLabel: 'Type', checked: false },
    { checkboxLabel: 'Terms', checked: false },
    { checkboxLabel: 'Value', checked: false },
    { checkboxLabel: 'Internal note', checked: false },
    { checkboxLabel: 'Public note', checked: false },
    { checkboxLabel: 'Visibility', checked: false },
    { checkboxLabel: 'Term names', checked: true },
  ])('Checking checkbox $checkboxLabel exists in the correct state (checked: $checked)', async ({ checkboxLabel, checked }) => {
    await Checkbox(checkboxLabel).is({ checked });
  });

  test('renders the Cancel button', async () => {
    await Button('Cancel').exists();
  });

  describe('Clicking the close button', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Button({ id: 'export-licenses-modal-close-button' }).click();
      });
    });

    test('onClose was called', async () => {
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });
});
