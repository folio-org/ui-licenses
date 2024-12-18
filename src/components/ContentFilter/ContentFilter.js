import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useIntl } from 'react-intl';

import { DocumentFilterArray } from '@folio/stripes-erm-components';
import {
  deparseKiwtQueryFilters,
  parseKiwtQueryFilters,
} from '@k-int/stripes-kint-components';

const ContentFieldArray = ({ handleSubmit, contentOptions, name }) => {
  const intl = useIntl();
  const translatedContentOptions = contentOptions?.map((e) => {
    return { value: e?.value, label: intl.formatMessage({ id: e?.id }) };
  });

  return (
    <DocumentFilterArray
      handleSubmit={handleSubmit}
      name={name}
      translatedContentOptions={translatedContentOptions}
    />
  );
};

const ContentFilter = ({
  contentOptions,
  name,
  filterHandlers,
  activeFilters,
}) => {
  const intl = useIntl();
  const contentFilters = activeFilters?.[name] || [];
  const translatedContentOptions = contentOptions?.map((e) => {
    return { value: e?.value, label: intl.formatMessage({ id: e?.id }) };
  });
  // Used to map labels to content values for use within the multiselection
  const mapContentLabels = (contentArray) => {
    return contentArray.map((content) => {
      return {
        value: content,
        label: translatedContentOptions?.find((e) => e?.value === content)
          ?.label,
      };
    });
  };

  // Used to parse filters back from query string
  const parseQueryString = (filterArray) => {
    // Returns structured filter groups
    const parsedFilters = parseKiwtQueryFilters(filterArray[0]);
    const filters = parsedFilters.reduce((acc, curr, index) => {
      if (index === 0) {
        // Special case for the first one
        return [
          ...acc,
          {
            // All filters in each group should have the same comparator by design
            attribute: curr[0]?.comparator,
            content: mapContentLabels(
              curr.filter((c) => typeof c !== 'string')?.map((c) => c.path)
            ),
          },
        ];
      } else if (index % 2 === 0) {
        // Even indices are the groups
        return [
          ...acc,
          {
            grouping: parsedFilters[index - 1],
            // All filters in each group should have the same comparator by design
            attribute: curr[0]?.comparator,
            content: mapContentLabels(
              curr.filter((c) => typeof c !== 'string')?.map((c) => c.path)
            ),
          },
        ];
      }

      // For odd indicies, keep acc as it is
      return acc;
    }, []);

    return filters;
  };

  const updateFilters = (values) => {
    const kiwtQueryFilterShape = values?.[name]?.reduce((acc, curr) => {
      let newAcc = [];
      // Rebuild to shape expected by deparseKiwtQueryFilters
      if (!curr.content || !curr.attribute) {
        return acc;
      }

      // First glue in any boolean logic
      if (curr.grouping) {
        newAcc = [...acc, curr.grouping];
      }

      // Then translate group into filters
      newAcc = [
        ...newAcc,
        curr.content.reduce((a, c, i) => {
          return [
            ...a,
            i !== 0 ? '||' : null, // Don't group on first entry
            {
              path: c.value,
              comparator: curr.attribute,
            },
          ].filter(Boolean);
        }, []),
      ];

      return newAcc;
    }, []);

    const validateFilter = (filter) => {
      return filter?.attribute && filter?.content?.length;
    };

    if (values?.[name]?.every(validateFilter)) {
      filterHandlers.state({
        ...activeFilters,
        [name]: [deparseKiwtQueryFilters(kiwtQueryFilterShape)],
      });
    }
  };

  return (
    <Form
      initialValues={{
        [name]: contentFilters.length ? parseQueryString(contentFilters) : [{}],
      }}
      mutators={arrayMutators}
      onSubmit={updateFilters}
    >
      {({ handleSubmit }) => (
        <form id="content-form" onSubmit={handleSubmit}>
          <ContentFieldArray
            contentOptions={contentOptions}
            handleSubmit={handleSubmit}
            name={name}
          />
        </form>
      )}
    </Form>
  );
};

ContentFieldArray.propTypes = {
  handleSubmit: PropTypes.func,
  contentOptions: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
};

ContentFilter.propTypes = {
  contentOptions: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  filterHandlers: PropTypes.object,
  activeFilters: PropTypes.object,
};

export default ContentFilter;
