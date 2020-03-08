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
import withForm from "../with-form/with-form.js";
import SignIn from "../../components/sign-in/sign-in.jsx";
import Main from "../../components/main/main.jsx";
import Favorites from "../../components/favorites/favorites.jsx";
import Property from "../../components/property/property.jsx";

import {compose} from "recompose";

import {Switch, Route} from "react-router-dom";

const SingInWrapped = withAuthorization(withForm(SignIn), true, `/`);
const FavoritesWrapped = withAuthorization(Favorites, false, `login`);

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
      } = childProps;
      delete childProps.city;
      delete childProps.cities;
      delete childProps.places;
      delete childProps.onChangeCity;
      delete childProps.isAuthorized;

      return (
        <Switch>
          <Route path="/login" component={SingInWrapped}/>
          <Route path="/favorites" component={FavoritesWrapped}/>
          <Route path="/offer/:id" component={Property} />
          <Route path="/" exact render={() => (
            <Component
              {...childProps}
              renderScreen={() => {
                return <Main
                  city={city}
                  cities={cities}
                  places={places}
                  onChangeCity={onChangeCity}
                />;
              }}
            />
          )}/>
        </Switch>
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

export {withScreenSwitch};
export default compose(connect(mapStateToProps, mapDispatchToProps), withScreenSwitch);
