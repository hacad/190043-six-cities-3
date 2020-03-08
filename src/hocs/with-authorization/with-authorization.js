import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Operation} from "../../reducers/user/reducer.js";
import {connect} from "react-redux";
import {getUser, isAuthorized} from "../../reducers/user/selectors.js";
import UserPropType from "../../components/prop-types/user.js";

import {compose} from "recompose";

function withAuthorization(Component) {
  class WithAuthorization extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        email: ``,
        password: ``
      };
      this._handleLogin = this._handleLogin.bind(this);
      this._handleLogout = this._handleLogout.bind(this);
      this._handleEmailChange = this._handleEmailChange.bind(this);
      this._handlePasswordChange = this._handlePasswordChange.bind(this);
    }

    _handleEmailChange(evt) {
      const email = evt.target.value;
      this.setState((prevState) => ({
        email,
        isCredentialsValid: !!email && !!prevState.password
      }));
    }

    _handlePasswordChange(evt) {
      const password = evt.target.value;
      this.setState((prevState) => ({
        password,
        isCredentialsValid: !!password && !!prevState.email
      }));
    }

    _handleLogin(evt) {
      evt.preventDefault();
      this.props.login({email: this.state.email, password: this.state.password});
    }

    _handleLogout(evt) {
      evt.preventDefault();
      this.props.logout({email: this.state.email, password: this.state.password});
    }

    render() {
      return (
        <Component
          {...this.props}
          onEmailChange={this._handleEmailChange}
          onPasswordChange={this._handlePasswordChange}
          onClickSignIn={this._handleLogin}
          onClickSignOut={this._handleLogout}
          isCredentialsValid={!!this.state.email && !!this.state.password}
        />
      );
    }
  }

  WithAuthorization.propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    user: UserPropType
  };

  return WithAuthorization;
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    user: getUser(state),
    isAuthorized: isAuthorized(state)
  });
};

function mapDispatchToProps(dispatch) {
  return {
    login: (form) => {
      dispatch(Operation.login(form));
    },

    logout: () => {
      dispatch(Operation.logout());
    }
  };
}

export {withAuthorization};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthorization);
