import { MemoryRouter } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, Select } from '@folio/stripes-erm-testing';

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
        await waitFor(async () => {
          await Select().choose('Permitted/Prohibited');
        });
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
