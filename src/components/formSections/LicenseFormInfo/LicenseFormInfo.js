import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Checkbox,
  Col,
  Row,
  Select,
  TextArea,
  TextField,
  getLocaleDateFormat,
  AppValidatedDatepicker
} from '@folio/stripes/components';

import {
  AlternativeNamesFieldArray,
  requiredValidator,
  datePlausibilityCheck,
  composeValidators
} from '@folio/stripes-erm-components';


const LicenseFormInfo = ({ data: { statusValues, typeValues }, id, mutators, values }) => {
  const intl = useIntl();
  const dateFormat = getLocaleDateFormat({ intl });
  const backendDateStandard = 'YYYY-MM-DD';
  /* istanbul ignore next */
  const validateEndDate = (value, allValues) => {
    if (value && allValues.startDate && (allValues.openEnded !== true)) {
      const startDate = new Date(allValues.startDate);
      const endDate = new Date(allValues.endDate);

      if (startDate >= endDate) {
        return (
          <div data-test-error-end-date-too-early>
            <FormattedMessage id="ui-licenses.errors.endDateGreaterThanStartDate" />
          </div>
        );
      }
    }
    return undefined;
  };

  return (
    <div data-test-license-info id={id}>
      <Row>
        <Col xs={12}>
          <Field
            autoFocus
            component={TextField}
            id="edit-license-name"
            label={<FormattedMessage id="ui-licenses.prop.name" />}
            maxLength={255}
            name="name"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6} xs={12}>
          <Field
            component={Select}
            dataOptions={typeValues}
            id="edit-license-type"
            label={<FormattedMessage id="ui-licenses.prop.type" />}
            name="type"
            placeholder=" "
            required
            validate={requiredValidator}
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            component={Select}
            dataOptions={statusValues}
            id="edit-license-status"
            label={<FormattedMessage id="ui-licenses.prop.status" />}
            name="status"
            placeholder=" "
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col md={5} xs={12}>
          <Field
            backendDateStandard={backendDateStandard}
            component={AppValidatedDatepicker}
            id="edit-license-start-date"
            label={<FormattedMessage id="ui-licenses.prop.startDate" />}
            name="startDate"
            parse={(v) => v} // Lets us pass an empty string instead of `undefined`
            timeZone="UTC"
            validate={(value) => datePlausibilityCheck(value, dateFormat, backendDateStandard)}
          />
        </Col>
        <Col md={5} xs={10}>
          <Field
            backendDateStandard={backendDateStandard}
            component={AppValidatedDatepicker}
            disabled={values.openEnded}
            id="edit-license-end-date"
            label={<FormattedMessage id="ui-licenses.prop.endDate" />}
            name="endDate"
            parse={(v) => v} // Lets us pass an empty string instead of `undefined`
            timeZone="UTC"
            validate={composeValidators(
              (value) => datePlausibilityCheck(value, dateFormat, backendDateStandard),
              validateEndDate
            )}
          />
        </Col>
        <Col style={{ paddingTop: 20 }} xs={2}>
          <Field name="openEnded" type="checkbox">
            {({ input }) => {
              /* istanbul ignore next */
              return (
                <Checkbox
                  checked={input.checked}
                  id="edit-license-open-ended"
                  label={<FormattedMessage id="ui-licenses.prop.openEnded" />}
                  onChange={(e) => {
                    input.onChange(e);
                    mutators.setFieldData('endDate', {
                      warning: e.target.checked ? (
                        <div data-test-warn-clear-end-date>
                          <FormattedMessage id="ui-licenses.warn.clearEndDate" />
                        </div>
                      ) : undefined,
                    });
                  }}
                  type="checkbox"
                />
              );
            }}
          </Field>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field
            component={TextArea}
            id="edit-license-description"
            label={<FormattedMessage id="ui-licenses.prop.description" />}
            name="description"
            parse={(v) => v} // Lets us pass an empty string instead of `undefined`
          />
        </Col>
      </Row>
      <FieldArray
        component={AlternativeNamesFieldArray}
        name="alternateNames"
      />
    </div>
  );
};

LicenseFormInfo.propTypes = {
  data: PropTypes.shape({
    statusValues: PropTypes.arrayOf(PropTypes.object),
    typeValues: PropTypes.arrayOf(PropTypes.object),
  }),
  id: PropTypes.string,
  mutators: PropTypes.object,
  values: PropTypes.object
};

export default LicenseFormInfo;
