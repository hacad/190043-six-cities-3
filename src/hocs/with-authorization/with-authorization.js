import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {Redirect} from "react-router-dom";
import {Operation} from "../../reducers/user/reducer.js";
import {getUser, isAuthorized} from "../../reducers/user/selectors.js";
import UserPropType from "../../components/prop-types/user.js";

function withAuthorization(Component, isPrivate) {
  class WithAuthorization extends PureComponent {
    constructor(props) {
      super(props);

      this._handleLogin = this._handleLogin.bind(this);
      this._handleLogout = this._handleLogout.bind(this);
    }

    _handleLogin(user) {
      this.props.login({email: user.email, password: user.password});
    }

    _handleLogout(user) {
      this.props.logout({email: user.email, password: user.password});
    }

    render() {
      return (
        isPrivate && !this.props.isAuthorized
          ? (
            <Redirect to="/login" />
          )
          : (
            <Component
              {...this.props}
              onClickSignIn={this._handleLogin}
              onClickSignOut={this._handleLogout}
              isAuthorized={this.props.isAuthorized}
              user={this.props.user}
            />
          )
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
