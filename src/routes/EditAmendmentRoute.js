import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { cloneDeep, get } from 'lodash';

import { CalloutContext, stripesConnect } from '@folio/stripes/core';

import Form from '../components/AmendmentForm';

const RECORDS_PER_REQUEST = 100;

class EditAmendmentRoute extends React.Component {
  static manifest = Object.freeze({
    license: {
      type: 'okapi',
      path: 'licenses/licenses/:{id}',
      shouldRefresh: () => false,
    },
    documentCategories: {
      type: 'okapi',
      path: 'licenses/refdata/DocumentAttachment/atType',
      limitParam: 'perPage',
      perRequest: RECORDS_PER_REQUEST,
      shouldRefresh: () => false,
    },
    statusValues: {
      type: 'okapi',
      path: 'licenses/refdata/License/status',
      shouldRefresh: () => false,
    },
    terms: {
      limitParam: 'perPage',
      perRequest: 100,
      type: 'okapi',
      path: 'licenses/custprops',
      shouldRefresh: () => false,
    },
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
        amendmentId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      license: PropTypes.shape({
        PUT: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      documentCategories: PropTypes.object,
      license: PropTypes.object,
      statusValues: PropTypes.object,
      terms: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    handlers: {},
  }

  static contextType = CalloutContext;

  state = {
    selectedAmendment: {}
  }

  static getDerivedStateFromProps(props, state) {
    const { resources, match: { params } } = props;
    const amendments = get(resources, 'license.records[0].amendments', []);
    const selectedAmendment = amendments.find(a => a.id === params.amendmentId);
    if (selectedAmendment && selectedAmendment.id !== state.selectedAmendment.id) {
      return { selectedAmendment };
    }

    return null;
  }

  getInitialValues = () => {
    const initialValues = cloneDeep(this.state.selectedAmendment);
    const {
      status = {},
      supplementaryDocs = [],
    } = initialValues;

    // Set the values of dropdown-controlled props as values rather than objects.
    initialValues.status = status.value;
    initialValues.supplementaryDocs = supplementaryDocs.map(o => ({ ...o, atType: get(o, 'atType.value') }));

    // Add the default terms to the already-set terms.
    initialValues.customProperties = initialValues.customProperties || {};
    const terms = get(this.props.resources, 'terms.records', []);
    terms
      .filter(t => t.primary && initialValues.customProperties[t.name] === undefined)
      .forEach(t => { initialValues.customProperties[t.name] = [{ _delete: true }]; });

    return initialValues;
  }

  handleClose = () => {
    const { location, match } = this.props;
    this.props.history.push(`/licenses/${match.params.id}/amendments/${match.params.amendmentId}${location.search}`);
  }

  handleSubmit = (amendment) => {
    const license = get(this.props.resources, 'license.records[0]', {});
    const name = amendment?.name;

    return this.props.mutator.license
      .PUT({
        ...license,
        amendments: [amendment]
      })
      .then(() => {
        this.context.sendCallout({ message: <FormattedMessage id="ui-licenses.amendments.update.callout" values={{ name }} /> });
        this.handleClose();
      });
  }

  fetchIsPending = () => {
    return Object.values(this.props.resources)
      .filter(r => r && r.resource !== 'licenses')
      .some(r => r.isPending);
  }

  render() {
    const { handlers, resources } = this.props;

    return (
      <Form
        data={{
          license: get(resources, 'license.records[0]', {}),
          documentCategories: get(resources, 'documentCategories.records', []),
          statusValues: get(resources, 'statusValues.records', []),
          terms: get(resources, 'terms.records', []),
        }}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
        }}
        initialValues={this.getInitialValues()}
        isLoading={this.fetchIsPending()}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default stripesConnect(EditAmendmentRoute);
