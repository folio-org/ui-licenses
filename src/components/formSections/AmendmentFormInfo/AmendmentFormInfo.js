import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { requiredValidator } from '@folio/stripes-erm-components';
import {
  Checkbox,
  Col,
  Datepicker,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

class AmendmentFormInfo extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      statusValues: PropTypes.arrayOf(PropTypes.object),
      typeValues: PropTypes.arrayOf(PropTypes.object),
    }),
    mutators: PropTypes.object,
    values: PropTypes.object
  };

  /* istanbul ignore next */
  validateEndDate = (value, allValues) => {
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
  }

  render() {
    const { data, mutators, values } = this.props;

    return (
      <div
        id="amendment-form-info"
        label={<FormattedMessage id="ui-licenses.section.amendmentInformation" />}
      >
        <Row>
          <Col xs={12}>
            <Field
              autoFocus
              component={TextField}
              id="edit-amendment-name"
              label={<FormattedMessage id="ui-licenses.prop.name" />}
              maxLength={255}
              name="name"
              required
              validate={requiredValidator}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={Select}
              dataOptions={data.statusValues}
              id="edit-amendment-status"
              label={<FormattedMessage id="ui-licenses.prop.status" />}
              name="status"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col md={5} xs={12}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              id="edit-amendment-start-date"
              label={<FormattedMessage id="ui-licenses.prop.startDate" />}
              name="startDate" // Lets us pass an empty string instead of `undefined`
              parse={v => v}
              timeZone="UTC"
            />
          </Col>
          <Col md={5} xs={10}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              disabled={values.openEnded}
              id="edit-amendment-end-date"
              label={<FormattedMessage id="ui-licenses.prop.endDate" />}
              name="endDate"
              parse={v => v} // Lets us pass an empty string instead of `undefined`
              timeZone="UTC"
              validate={this.validateEndDate}
            />
          </Col>
          <Col style={{ paddingTop: 20 }} xs={2}>
            <Field
              name="openEnded"
              type="checkbox"
            >
              {props => {
                /* istanbul ignore next */
                return (<Checkbox
                  checked={props.input.checked}
                  id="edit-amendment-open-ended"
                  label={<FormattedMessage id="ui-licenses.prop.openEnded" />}
                  onChange={e => {
                    props.input.onChange(e);
                    mutators.setFieldData('endDate', {
                      warning: e.target.checked ? (
                        <div data-test-warn-clear-end-date>
                          <FormattedMessage id="ui-licenses.warn.clearEndDate" />
                        </div>
                      ) : undefined
                    });
                  }}
                  type="checkbox"
                />);
              }}
            </Field>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={TextArea}
              id="edit-amendment-description"
              label={<FormattedMessage id="ui-licenses.prop.description" />}
              name="description"
              parse={v => v} // Lets us pass an empty string instead of `undefined`
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AmendmentFormInfo;
