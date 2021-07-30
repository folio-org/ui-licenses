import {
  interactor,
  isPresent,
  collection,
  fillable,
  text,
  value,
} from '@bigtest/interactor';

@interactor class InternalContactCardInteractor {
  userName = text('[data-test-user-name]');
}

export default @interactor class LicenseFormInteractor {
  isLicenseForm = isPresent('#pane-license-form');
  isNamePresent = isPresent('#edit-license-name');
  fillName = fillable('#edit-license-name');
  name = value('#edit-license-name');

  internalContacts = collection('[data-test-internal-contact]', InternalContactCardInteractor)

  whenLoaded() {
    return this.when(() => this.isLicenseForm).timeout(10000);
  }

  whenNameFieldLoaded() {
    return this.when(() => this.isNamePresent).timeout(5000);
  }
}
