
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { Datepicker, Checkbox, Button, Select } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import { data, handlers, mutators, values, initialValues } from './testResources';
import AmendmentFormInfo from './AmendmentFormInfo';

const onSubmit = jest.fn();

describe('AmendmentFormInfo', () => {
  let renderComponent;
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <AmendmentFormInfo
            data={data}
            handlers={handlers}
            mutators={mutators}
            validate={() => { }}
            values={values}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Name field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Name' }));
    });

    test('renders the Status dropdown', async () => {
      await Select('Status*').exists();
    });

    test('renders start date DatePicker', async () => {
      await Datepicker('Start date').exists();
    });

    test('renders end date DatePicker', async () => {
      await Datepicker('End date').exists();
    });

    test('renders open ended checkbox', async () => {
      await Checkbox({ id: 'edit-amendment-open-ended' }).exists();
    });

    test('renders the Description field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Description' }));
    });
  });

  describe('with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={initialValues} onSubmit={onSubmit}>
          <AmendmentFormInfo
            data={data}
            handlers={handlers}
            mutators={mutators}
            validate={() => { }}
            values={values}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected value in the name field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Name' })).toHaveDisplayValue('Amendment Test');
    });

    test('renders the expected value in the Status field', async () => {
      await Select('Status*').has({ value: 'active' });
    });

    test('renders the expected value in the start date field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Start date' })).toHaveDisplayValue('01/02/2022');
    });

    test('renders the expected value in the end date field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'End date' })).toHaveDisplayValue('01/20/2022');
    });

    test('renders the open ended checkbox ', () => {
      expect(('checkbox', { name: 'Open ended' })).toBeTruthy();
    });

    test('renders the expected value in the Description field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Description' })).toHaveDisplayValue('Amendment description');
    });

    test('renders the submit button', async () => {
      await Button('Submit').exists();
    });
  });
});
