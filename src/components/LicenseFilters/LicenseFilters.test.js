import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { mockErmComponents, renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Accordion, Checkbox, Selection, SelectionList as SelectListInteractor } from '@folio/stripes-testing';
import translationsProperties from '../../../test/helpers';
import { activeFilters, data } from './testResources';
import LicenseFilters from './LicenseFilters';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  ...mockErmComponents,
  OrganizationSelection: () => <div>OrganizationSelection</div>,
  DateFilter: () => <div>DateFilter</div>,
}));

const stateMock = jest.fn();

const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
  stat: () => {},
};
describe('LicenseFilters', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <LicenseFilters
          activeFilters={activeFilters}
          data={data}
          filterHandlers={filterHandlers}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Status Accordion', async () => {
    await Accordion('Status').exists();
  });

  test('renders the Type Accordion', async () => {
    await Accordion('Type').exists();
  });

  test('renders the Organizations Accordion', async () => {
    await Accordion('Organizations').exists();
  });

  test('renders the Organization role Accordion', async () => {
    await Accordion('Organization role').exists();
  });

  test('renders the Tags Accordion', async () => {
    await Accordion('Tags').exists();
  });

  test('renders the OrganizationSelection component', () => {
    const { getByText } = renderComponent;
    expect(getByText('OrganizationSelection')).toBeInTheDocument();
  });

  test('clicking the active checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-status-active' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  test('clicking the expired checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-status-expired' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  test('clicking the negotiation checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-status-in-negotiation' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  test('clicking the in not active yet checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-status-not-yet-active' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  test('clicking the rejected checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-status-rejected' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  test('clicking the for type alliance checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-type-alliance' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  test('clicking the consortial checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-type-consortial' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  test('clicking the type local checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-type-local' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  test('clicking the type national checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-type-national' }).click();
    expect(stateMock).toHaveBeenCalled();
  });

  it('choosing an organization role option', async () => {
    await Selection({ id: 'stripes-selection-95' }).exists();
    await Selection().open();
    await SelectListInteractor({ optionCount: 1 }).exists();
  });
});
