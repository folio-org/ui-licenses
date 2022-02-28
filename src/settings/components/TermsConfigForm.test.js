import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import PropTypes from 'prop-types';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@folio/stripes/components';
import { Pane, PaneHeader, Button as ButtonInteractor } from '@folio/stripes-testing';
import translationsProperties from '../../../test/helpers';
import TermsConfigForm from './TermsConfigForm';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  CustomPropertiesConfigListFieldArray: (props) => <div><div>CustomPropertiesConfigListFieldArray</div><SaveButton {...props} /><DeleteButton {...props} /></div>
}));

const onSubmit = jest.fn();
const mockDelete = jest.fn().mockImplementation(() => Promise.resolve());
const mockSave = jest.fn().mockImplementation(() => Promise.resolve());

const SaveButton = (props) => {
  return <Button onClick={props.onSave}>SaveButton</Button>;
};

const DeleteButton = (props) => {
  return <Button onClick={props.onDelete}>DeleteButton</Button>;
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func,
};

SaveButton.propTypes = {
  onSave: PropTypes.func,
};

const initialValues = {
  'customProperties': []
};

const form = {
  'batch': 'ƒ batch() {}',
  'blur': 'ƒ blur() {}',
  'change': 'ƒ change() {}',
  'destroyOnUnregister': false,
  'focus': 'ƒ focus() {}',
  'mutators': {
    'setCustomPropertyValue': () => { },
    'insert': () => { },
    'concat': () => { },
    'move': () => { },
    'pop': () => { },
    'push': () => { },
    'remove': () => { },
    'removeBatch': () => { },
    'shift': () => { },
    'swap': () => { },
    'unshift': () => { },
    'update': () => { },
  },
  'getFieldState': 'ƒ getFieldState() {}',
  'getRegisteredFields': 'ƒ getRegisteredFields() {}',
  'getState': 'ƒ getState() {}',
  'initialize': 'ƒ initialize() {}',
  'isValidationPaused': 'ƒ isValidationPaused() {}',
  'pauseValidation': 'ƒ pauseValidation() {}',
  'registerField': 'ƒ registerField() {}',
  'reset': 'ƒ reset() {}',
  'resetFieldState': 'ƒ resetFieldState() {}',
  'restart': 'ƒ restart() {}',
  'resumeValidation': 'ƒ resumeValidation() {}',
  'setConfig': 'ƒ setConfig() {}',
  'submit': 'ƒ () {}',
  'subscribe': 'ƒ subscribe() {}'
};

const match = {
  'path': '/settings/licenses/terms',
  'url': '/settings/licenses/terms',
  'isExact': true,
  'params': '{}'
};

const pickLists = [
  {
    'label': 'DocumentAttachment.AtType',
    'value': '02d318287f218761017f218a4ad4000a'
  },
  {
    'label': 'FileStorageEngines',
    'value': '02d318287f218761017f218a4b69001b'
  },
  {
    'label': 'InternalContact.Role',
    'value': '02d318287f218761017f218a4af1000e'
  },
  {
    'label': 'License.EndDateSemantics',
    'value': '02d318287f218761017f218a4a630000'
  },
  {
    'label': 'LicenseOrg.Role',
    'value': '02d318287f218761017f218a4b210014'
  },
  {
    'label': 'License.Status',
    'value': '02d318287f218761017f218a4aa70004'
  },
  {
    'label': 'License.Type',
    'value': '02d318287f218761017f218a4b2b0016'
  },
  {
    'label': 'Permitted/Prohibited',
    'value': '02d318287f218761017f218a4c050028'
  },
  {
    'label': 'Yes/No/Other',
    'value': '02d318287f218761017f218a4bdd0024'
  }
];

describe('TermsConfigForm', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TermsConfigForm
          form={form}
          initialValues={initialValues}
          match={match}
          onDelete={mockDelete}
          onSave={mockSave}
          onSubmit={onSubmit}
          pickLists={pickLists}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('displays the terms pane title', async () => {
    await Pane('Terms').is({ visible: true });
  });

  test('displays the terms pane header', async () => {
    await PaneHeader('Terms').is({ visible: true });
  });

  test('displays the terms subtitle', () => {
    const { getByText } = renderComponent;
    expect(getByText('0 saved terms')).toBeInTheDocument();
  });

  test('renders the CustomPropertiesConfigListFieldArray component', () => {
    const { getByText } = renderComponent;
    expect(getByText('CustomPropertiesConfigListFieldArray')).toBeInTheDocument();
  });

  test('triggers the DeleteButton callback', async () => {
    await ButtonInteractor('DeleteButton').click();
    expect(mockDelete).toHaveBeenCalled();
  });

  test('triggers the SaveButton callback', async () => {
    await ButtonInteractor('SaveButton').click();
    expect(mockSave).toHaveBeenCalled();
  });
});
