import React from 'react';

import { HeadlineInteractor as Headline, renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { Button, Checkbox } from '@folio/stripes-testing';
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

  test('clicking the monograph checkbox', async () => {
    await Checkbox('Select all/deselect all').is({ checked: false });
    await Checkbox('License information').is({ checked: false });
    await Checkbox('Name').is({ checked: false });
    await Checkbox('Start date').is({ checked: false });
    await Checkbox('End date').is({ checked: false });
    await Checkbox('Status').is({ checked: false });
    await Checkbox('Type').is({ checked: false });
    await Checkbox('Terms').is({ checked: false });
    await Checkbox('Value').is({ checked: false });
    await Checkbox('Internal note').is({ checked: false });
    await Checkbox('Public note').is({ checked: false });
    await Checkbox('Visibility').is({ checked: false });
    await Checkbox('Term names').is({ checked: true });
  });

  test('renders the Cancel button', async () => {
    await Button('Cancel').exists();
  });

  test('clicking the close button', async () => {
    await Button({ id: 'export-licenses-modal-close-button' }).click();
    expect(onClose).toHaveBeenCalled();
  });
});
