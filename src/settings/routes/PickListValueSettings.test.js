import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Select } from '@folio/stripes-testing';

import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import PickListValueSettings from './PickListValueSettings';

import mockRefdata from '../../../test/jest/refdata';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLicenseRefdata: () => mockRefdata,
}));

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  EditableRefdataList: () => <div>EditableRefdataList</div>,
}));

describe('PickListValueSettings', () => {
  describe('rendering the PickListValueSettings', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PickListValueSettings />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders expected Refdata selection selector', async () => {
      await Select('Pick list').exists();
    });

    describe('select a pick list', () => {
      beforeEach(async () => {
        await Select().choose('Permitted/Prohibited');
      });

      it('renders expected status of Permitted/Prohibited', async () => {
        await Select().has({ value: 'Permitted/Prohibited' });
      });

      test('renders the EditableRefdataList component', () => {
        const { getByText } = renderComponent;
        expect(getByText('EditableRefdataList')).toBeInTheDocument();
      });
    });
  });
});
