import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { Button as MockStripesButton } from '@folio/stripes/components';
import { Button, renderWithIntl } from '@folio/stripes-erm-testing';

import { useFileHandlers } from '@folio/stripes-erm-components';

import translationsProperties from '../../../test/helpers';
import withFileHandlers from './withFileHandlers';


const MockApp = (props) => {
  return (
    <>
      <MockStripesButton onClick={props.handlers.onUploadFile} type="button">Upload</MockStripesButton>
      <MockStripesButton onClick={props.handlers.onDownloadFile} type="button">Download</MockStripesButton>
    </>
  );
};

MockApp.propTypes = {
  handlers: PropTypes.shape({
    onDownloadFile: PropTypes.func,
    onUploadFile: PropTypes.func
  })
};

const mockDownload = jest.fn();
const mockUpload = jest.fn();

const MockWithHOC = withFileHandlers(MockApp);

describe('withFileHandlers', () => {
  useFileHandlers.mockImplementation(() => ({
    handleDownloadFile: mockDownload,
    handleUploadFile: mockUpload
  }));

  describe('rendering the MockApp', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <MockWithHOC />
        </MemoryRouter>,
        translationsProperties
      );
    });

    describe.each([
      { buttonLabel: 'Download', callback: mockDownload },
      { buttonLabel: 'Upload', callback: mockUpload }
    ])('Clicking $buttonLabel button', ({ buttonLabel, callback }) => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button(buttonLabel).click();
        });
      });

      test(`expect ${callback} to have been called`, async () => {
        await waitFor(() => {
          expect(callback).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
