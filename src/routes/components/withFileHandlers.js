import React from 'react';
import PropTypes from 'prop-types';
import { useFileHandlers } from '@folio/stripes-erm-components';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

// DEPRECATED we can safely remove this and its test
export default function withFileHandlers(WrappedComponent) {
  const WithFileHandlers = ({ handlers, ...rest }) => {
    const { handleDownloadFile, handleUploadFile } = useFileHandlers('licenses/files');
    return (
      <WrappedComponent
        handlers={{
          ...handlers,
          onDownloadFile: handleDownloadFile,
          onUploadFile: handleUploadFile,
        }}
        {...rest}
      />
    );
  };

  WithFileHandlers.propTypes = {
    handlers: PropTypes.object
  };

  WithFileHandlers.displayName = `WithFileHandlers(${getDisplayName(WrappedComponent)})`;
  return WithFileHandlers;
}
