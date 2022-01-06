/* global before, after, Nightmare */

module.exports.test = (uiTestCtx) => {
  const number = Math.round(Math.random() * 100000);
  const testNote = `note${Math.floor(Math.random() * 100000)}`;
  const editedNote = `editnote${Math.floor(Math.random() * 100000)}`;
  const noteType = `noteType${Math.floor(Math.random() * 100000)}`;
  const license = {
    name: `Notes License #${number}`,
  };

  describe('Notes crud', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);
    nightmare.options.width = 1300; // added this temporarily as MultiSelect doesnt work well with narrow screen sizes

    this.timeout(Number(config.test_timeout));

    describe('Login > Find license > Create notes > Logout\n', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Settings', done => {
        helpers.clickSettings(nightmare, done);
      });

      it('should create note type in settings', done => {
        nightmare
          .wait('a[href="/settings/notes"]')
          .click('a[href="/settings/notes"]')
          .wait('a[href="/settings/notes/general"]')
          .click('a[href="/settings/notes/general"]')
          .waitUntilNetworkIdle(1000)
          .wait('#clickable-add-noteTypes')
          .click('#clickable-add-noteTypes')
          .wait('input[name="items[0].name"]')
          .type('input[name="items[0].name"]', noteType)
          .wait('#clickable-save-noteTypes-0')
          .click('#clickable-save-noteTypes-0')
          .wait(222)
          .then(done)
          .catch(done);
      });

      it('should open Licenses app', done => {
        helpers.clickApp(nightmare, done, 'licenses');
      });

      it('should confirm correct URL', done => {
        nightmare
          .evaluate(() => document.location.pathname)
          .then(pathName => {
            if (!pathName.includes('/licenses')) throw Error('URL is incorrect');
            done();
          })
          .catch(done);
      });

      it('should navigate to create license page', done => {
        nightmare
          .wait('#list-licenses')
          .wait('#clickable-new-license') // 'New' button removed, ERM-1149
          .click('#clickable-new-license') // 'New' button removed, ERM-1149

          .waitUntilNetworkIdle(2000) // Wait for the default values to be fetched and set.

          .insert('#edit-license-name', license.name)

          .then(done)
          .catch(done);
      });

      it(`should create license ${license.name}`, done => {
        nightmare
          .click('#clickable-create-license')
          .waitUntilNetworkIdle(2000) // Wait for record to be fetched
          .then(done)
          .catch(done);
      });

      it('should add a new note', done => {
        nightmare
          .wait('#accordion-toggle-button-licenseNotes')
          .click('#accordion-toggle-button-licenseNotes')
          .wait('[data-test-notes-accordion-new-button]')
          .click('[data-test-notes-accordion-new-button]')
          .wait('[data-test-note-types-field]')
          .type('[data-test-note-types-field]', noteType)
          .wait('[data-test-note-title-field]')
          .insert('[data-test-note-title-field]', testNote)
          .wait('[data-test-save-note]')
          .click('[data-test-save-note]')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it('should find created note in notes list', done => {
        nightmare
          .evaluate(note => {
            const notesRows = [...document.querySelectorAll('#notes-list')].map(e => e.textContent);
            const noteElement = notesRows.find(r => r.indexOf(note) >= 0);
            if (!noteElement) {
              throw Error(`Could not find row with the note ${note}`);
            }
          }, testNote)
          .then(done)
          .catch(done);
      });

      it(`should edit note to ${editedNote}`, done => {
        nightmare
          .evaluate(note => {
            const notesElements = [...document.querySelectorAll('div[role="gridcell"]')];
            const noteElement = notesElements.find(e => e.textContent === note);
            if (!noteElement) {
              throw Error(`Could not find row with the note ${note}`);
            }
            noteElement.click();
          }, testNote)
          .then(() => {
            nightmare
              .wait('[data-test-navigate-note-edit]')
              .click('[data-test-navigate-note-edit]')
              .waitUntilNetworkIdle(2000)
              .wait('[data-test-note-title-field]')
              .insert('[data-test-note-title-field]', '')
              .insert('[data-test-note-title-field]', editedNote)
              .wait('[data-test-save-note]')
              .click('[data-test-save-note]')
              .waitUntilNetworkIdle(2000)
              .then(done)
              .catch(done);
          })
          .catch(done);
      });

      it('should find edited note in notes list', done => {
        nightmare
          .wait('[data-test-leave-note-view]')
          .click('[data-test-leave-note-view]')
          .waitUntilNetworkIdle(2000)
          .wait('#notes-list')
          .evaluate(note => {
            const notesRows = [...document.querySelectorAll('#notes-list')].map(e => e.textContent);
            const noteElement = notesRows.find(r => r.indexOf(note) >= 0);
            if (!noteElement) {
              throw Error(`Could not find row with the edited note ${note} but found ${noteElement}`);
            }
          }, editedNote)
          .then(done)
          .catch(done);
      });

      it('should delete the note', done => {
        nightmare
          .wait('#notes-list [aria-rowindex="2"]')
          .click('#notes-list [aria-rowindex="2"]')
          .waitUntilNetworkIdle(2000)
          .wait('[data-test-pane-header-actions-button]')
          .click('[data-test-pane-header-actions-button]')
          .wait('[data-test-note-delete]')
          .click('[data-test-note-delete]')
          .wait('#clickable-confirm-delete-note-confirm')
          .click('#clickable-confirm-delete-note-confirm')
          .waitUntilNetworkIdle(2000)
          .evaluate(note => {
            const notesRows = [...document.querySelectorAll('#notes-list')].map(e => e.textContent);
            const noteElement = notesRows.find(r => r.indexOf(note) >= 0);

            if (noteElement) {
              throw Error(`Should not find row with the edited note ${note}`);
            }
          }, editedNote)
          .then(done)
          .catch(done);
      });
    });
  });
};
