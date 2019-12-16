import React, {PureComponent} from "react";

function withForm(Component) {
  const initialState = {
    isDisabled: true,
    key: Math.random(),
    errors: {},
    form: {}
  };

  return class WithForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = initialState;

      this._handleChange = this._handleChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleError = this._handleError.bind(this);
    }

    render() {
      const {key, form, errors, isDisabled} = this.state;

      return (
        <Component
          {...this.props}
          key={key}
          form={form}
          errors={errors}
          isDisabled={isDisabled}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
          onError={this._handleError}
        />
      );
    }

    _handleChange(evt) {
      evt.persist();
      const checkValidity = evt.target.form.checkValidity();
      this.setState((currentState) => ({
        isDisabled: !checkValidity,
        form: Object.assign({}, currentState.form, {
          [evt.target.name]: evt.target.value
        }),
        errors: Object.assign({}, currentState.errors, {
          [evt.target.name]: evt.target.validationMessage
        })
      }));
    }

    _handleSubmit() {
      this.setState(Object.assign({}, initialState, {key: Math.random()}));
    }

    _handleError(errors) {
      this.setState((currentState) => ({
        errors: Object.assign({}, currentState.errors, errors)
      }));
    }
  };
}

export default withForm;
