import {
  Checkbox,
  Datepicker,
  Select,
  TestForm,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../test/helpers';
import { data, values, mutators } from './testResources';
import LicenseFormInfo from './LicenseFormInfo';

const onSubmit = jest.fn();
const onDownloadFileMock = jest.fn();
const onUploadFileMock = jest.fn();
const onCloseMock = jest.fn();

describe('LicenseFormInfo', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <LicenseFormInfo
          data={data}
          handlers={{
            onClose: onCloseMock,
            onDownloadFile: onDownloadFileMock,
            onUploadFile: onUploadFileMock
          }}
          id="licenseFormInfo"
          mutators={mutators}
          values={values}
        />
      </TestForm>, translationsProperties
    );
  });

  test('renders Name field', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('textbox', { name: 'Name' }));
  });

  test('renders Description field', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('textbox', { name: 'Description' }));
  });

  test('renders the Type dropdown', async () => {
    await Select('Type*').exists();
  });

  test('renders the Status dropdown', async () => {
    await Select('Status*').exists();
  });

  test('renders Start date Datepicker', async () => {
    await Datepicker({ id: 'edit-license-start-date' }).exists();
  });

  test('renders End date Datepicker', async () => {
    await Datepicker({ id: 'edit-license-end-date' }).exists();
  });

  test('renders Open ended Checkbox', async () => {
    await Checkbox({ id: 'edit-license-open-ended' }).exists();
  });

  test('renders the AlternativeNamesFieldArray component', () => {
    const { getByText } = renderComponent;
    expect(getByText('AlternativeNamesFieldArray')).toBeInTheDocument();
  });

  test('renders the Open ended checkbox', () => {
    expect(('checkbox', { name: 'Open ended' })).toBeTruthy();
  });
});
