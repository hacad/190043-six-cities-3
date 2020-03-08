import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducers/data/reducer.js";
import ReducerNames from "../../reducers/reducer-names.js";
import {getSortingOption} from "../../reducers/data/selectors.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import PlacesSortingPropType from "../prop-types/places-sorting.js";
import PlacesSorting from "../places-sorting/places-sorting.jsx";
import PlacePropType from "../prop-types/place.js";
import PlacesList from "../places-list/places-list.jsx";
import CitiesMap from "../cities-map/cities-map.jsx";
import CityPropType from "../prop-types/city.js";
import {placesSortingOptions} from "../../mocks/places-sorting-options";

const PlacesSortingWrapped = withActiveItem(PlacesSorting, false, `Opened`);
const PlacesListWrapped = withActiveItem(PlacesList);

function Places(props) {
  const {places, onActivateItem, onDeactivateItem, onChangeSorting,
    activeCity, activeOffer, selectedItem} = props;
  const offers = places.map((place) => {
    return {data: place.location};
  });
  const activeCitiesMapOffer = activeOffer
    ? {
      data: activeOffer.location,
      displaySettings: {
        icon: {
          iconUrl: `/img/pin-active.svg`
        }
      }
    }
    : undefined;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} {offers.length === 1 ? `place` : `places`} to stay in {places[0].city.name}</b>
        <PlacesSortingWrapped
          activeCity={activeCity}
          selectedItem={selectedItem}
          items={placesSortingOptions}
          onItemSelect={onChangeSorting}
        />
        <PlacesListWrapped
          places={places}
          onClickCardHeader={() => {}}
          className="cities__places-list places__list tabs__content"
          onActivatePlace={onActivateItem}
          onDeactivatePlace={onDeactivateItem}
          articleTagClassNamePrefix="cities__place-card"
          divImageWrapperClassNamePrefix="cities__image-wrapper"
        />
      </section>
      <div className="cities__right-section">
        <CitiesMap city={activeCity} offers={offers} activeOffer={activeCitiesMapOffer} className="property__map map"/>
      </div>
    </div>
  );
}

Places.propTypes = {
  places: PropTypes.arrayOf(PlacePropType).isRequired,
  className: PropTypes.string.isRequired,
  onClickCardHeader: PropTypes.func.isRequired,
  activeOffer: PlacePropType,
  onActivateItem: PropTypes.func.isRequired,
  onDeactivateItem: PropTypes.func.isRequired,
  onChangeSorting: PropTypes.func.isRequired,
  activeCity: CityPropType.isRequired,
  selectedItem: PlacesSortingPropType.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    selectedItem: getSortingOption(state),
    activeOffer: state[ReducerNames.DATA].activeOffer
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSorting: (placeSortingOption) => {
      dispatch(ActionCreator.changeSorting(placeSortingOption));
    },
    onActivateItem: (activeOffer) => {
      dispatch(ActionCreator.changeActiveOffer(activeOffer));
    },
    onDeactivateItem: () => {
      dispatch(ActionCreator.changeActiveOffer(undefined));
    }
  };
};

export {Places};

export default connect(mapStateToProps, mapDispatchToProps)(Places);
