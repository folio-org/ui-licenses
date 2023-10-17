import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Field, useForm, useFormState } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Dropdown,
  DropdownMenu,
  MultiSelection,
  Select,
  Button,
  Label,
  IconButton,
  Row,
  Col,
} from '@folio/stripes/components';

import {
  deparseKiwtQueryFilters,
  parseKiwtQueryFilters,
} from '@k-int/stripes-kint-components';

import { amendmentContentOptions } from '../../constants';

const AmendmentContentFieldArray = ({ handleSubmit }) => {
  const intl = useIntl();
  const translatedContentOptions = amendmentContentOptions.map((e) => {
    return { value: e?.value, label: intl.formatMessage({ id: e?.id }) };
  });

  const { values } = useFormState();
  const { change } = useForm();

  const [open, setOpen] = useState(false);

  return (
    <FieldArray name="amendmentContent">
      {({ fields }) => (
        <>
          {fields?.map((filter, index) => {
            return (
              <div key={index}>
                {values?.amendmentContent[index]?.grouping === '&&' && (
                  <Label>
                    <FormattedMessage id="ui-licenses.AND" />
                  </Label>
                )}
                {values?.amendmentContent[index]?.grouping === '||' && (
                  <Label>
                    <FormattedMessage id="ui-licenses.OR" />
                  </Label>
                )}
                <Row xs="end">
                  <Col xs={10}>
                    <Field
                      component={Select}
                      dataOptions={[
                        { value: '', label: '' },
                        {
                          value: 'isNotEmpty',
                          label: intl.formatMessage({
                            id: 'ui-licenses.licenseContent.filter.has',
                          }),
                        },
                        {
                          value: 'isEmpty',
                          label: intl.formatMessage({
                            id: 'ui-licenses.licenseContent.filter.hasNot',
                          }),
                        },
                      ]}
                      id={`${filter}-attribute-select`}
                      name={`${filter}.attribute`}
                      onChange={(e) => {
                        change(`${filter}.attribute`, e?.target?.value);
                        handleSubmit();
                      }}
                    />
                    <Field
                      component={MultiSelection}
                      dataOptions={translatedContentOptions}
                      id={`${filter}-content-multi-select`}
                      name={`${filter}.content`}
                      onChange={(e) => {
                        change(`${filter}.content`, e);
                        handleSubmit();
                      }}
                    />
                  </Col>
                  {index !== 0 && (
                    <Col>
                      <IconButton
                        icon="times-circle-solid"
                        onClick={(e) => {
                          e.stopPropagation();
                          fields.remove(index);
                          handleSubmit();
                        }}
                      />
                    </Col>
                  )}
                </Row>
              </div>
            );
          })}
          <Dropdown
            label={
              <FormattedMessage id="ui-licenses.licenseContent.filter.addFilter" />
            }
            onToggle={() => setOpen(!open)}
            open={open}
          >
            <DropdownMenu>
              <Button
                buttonStyle="dropdownItem"
                onClick={() => {
                  fields.push({ grouping: '&&' });
                  setOpen(false);
                }}
              >
                <FormattedMessage id="ui-licenses.AND" />
              </Button>
              <Button
                buttonStyle="dropdownItem"
                onClick={() => {
                  fields.push({ grouping: '||' });
                  setOpen(false);
                }}
              >
                <FormattedMessage id="ui-licenses.OR" />
              </Button>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
    </FieldArray>
  );
};

const AmendmentContentFilter = ({
  amendmentContentFilters,
  filterHandlers,
  activeFilters,
}) => {
  const intl = useIntl();
  const translatedContentOptions = amendmentContentOptions.map((e) => {
    return { value: e?.value, label: intl.formatMessage({ id: e?.id }) };
  });
  // Used to map labels to content values for use within the multiselection
  const mapContentLabels = (contentArray) => {
    const formattedArray = contentArray
      .map((value) => {
        return value;
      })
      .filter((value) => value !== undefined);

    return formattedArray.map((content) => {
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
    const kiwtQueryFilterShape = values?.amendmentContent?.reduce((acc, curr) => {
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

    if (values?.amendmentContent?.every(validateFilter)) {
      filterHandlers.state({
        ...activeFilters,
        // FIXME this isn't ideal, KIWT should accept spaces in query -- Ask Steve
        amendmentContent: [
          deparseKiwtQueryFilters(kiwtQueryFilterShape)
            .replaceAll(' || ', '||')
            .replaceAll(' && ', '&&'),
        ],
      });
    }
  };

  return (
    <Form
      initialValues={{
        amendmentContent: amendmentContentFilters?.length
          ? parseQueryString(amendmentContentFilters)
          : [{}],
      }}
      mutators={arrayMutators}
      onSubmit={updateFilters}
    >
      {({ handleSubmit }) => (
        <form id="amendment-content-form" onSubmit={handleSubmit}>
          <AmendmentContentFieldArray
            handleSubmit={handleSubmit}
            name="amendmentContent"
          />
        </form>
      )}
    </Form>
  );
};

AmendmentContentFieldArray.propTypes = {
  handleSubmit: PropTypes.func,
};

AmendmentContentFilter.propTypes = {
  amendmentContentFilters: PropTypes.arrayOf(PropTypes.object),
  filterHandlers: PropTypes.object,
  activeFilters: PropTypes.object,
};

export default AmendmentContentFilter;
