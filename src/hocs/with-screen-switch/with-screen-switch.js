import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import CityPropType from "../../components/prop-types/city";
import PlacePropType from "../../components/prop-types/place.js";
import {ActionCreator} from "../../reducers/data/reducer.js";
import {
  getSelectedPlaces,
  getCities,
  getCity
} from "../../reducers/data/selectors.js";
import {isAuthorized as isAuthorizedSelector} from "../../reducers/user/selectors.js";

import withAuthorization from "../with-authorization/with-authorization.js";
import SignIn from "../../components/sign-in/sign-in.jsx";
import Main from "../../components/main/main.jsx";

import {compose} from "recompose";

const SingInWrapped = withAuthorization(SignIn);

function withScreenSwitch(Component) {
  class WithScreenSwitch extends PureComponent {
    render() {
      const childProps = {};
      Object.assign(childProps, this.props);
      const {
        city,
        cities,
        places,
        onChangeCity,
        isAuthorized
      } = childProps;
      delete childProps.city;
      delete childProps.cities;
      delete childProps.places;
      delete childProps.onChangeCity;
      delete childProps.isAuthorized;

      return (
        <Component
          {...childProps}
          renderScreen={() => {
            if (!isAuthorized) {
              return <SingInWrapped />;
            } else {
              return <Main
                city={city}
                cities={cities}
                places={places}
                onChangeCity={onChangeCity}
              />;
            }
          }}
        />
      );
    }
  }

  WithScreenSwitch.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    city: CityPropType,
    cities: PropTypes.arrayOf(CityPropType).isRequired,
    places: PropTypes.arrayOf(PlacePropType).isRequired,
    onChangeCity: PropTypes.func.isRequired
  };

  // return connect(mapStateToProps, mapDispatchToProps)(WithScreenSwitch);

  return WithScreenSwitch;
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    places: getSelectedPlaces(state),
    city: getCity(state),
    cities: getCities(state),
    isAuthorized: isAuthorizedSelector(state)
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCity: (city) => {
      dispatch(ActionCreator.changeCity(city));
    }
  };
};

// export default withScreenSwitch;
export {withScreenSwitch};
export default compose(connect(mapStateToProps, mapDispatchToProps), withScreenSwitch);
