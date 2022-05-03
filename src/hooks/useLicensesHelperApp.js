import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useHelperApp } from '@k-int/stripes-kint-components';

import { IconButton } from '@folio/stripes/components';
import { Tags } from '@folio/stripes-erm-components';

const useLicensesHelperApp = (tagsEnabled) => {
  const { HelperComponent, helperToggleFunctions, isOpen } = useHelperApp({
    tags: Tags,
  });

  const handleToggleTags = () => {
    if (tagsEnabled) {
      helperToggleFunctions.tags();
    }
  };

  const TagButton = ({ entity, onClick = () => null }) => (
    <FormattedMessage id="ui-licenses.showTags">
      {ariaLabel => (
        <IconButton
          ariaLabel={ariaLabel[0]}
          badgeCount={entity?.tags?.length ?? 0}
          icon="tag"
          id="clickable-show-tags"
          onClick={
            () => {
              handleToggleTags();
              onClick({ open: isOpen('tags') });
            }
          }
        />
      )}
    </FormattedMessage>
  );

  TagButton.propTypes = {
    entity: PropTypes.object,
    onClick: PropTypes.func
  };

  return { handleToggleTags, HelperComponent, TagButton, isOpen };
};

export default useLicensesHelperApp;
