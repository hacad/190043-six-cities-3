import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducers/data/reducer.js";
import ReducerNames from "../../reducers/reducer-names.js";
import {getSortingOption} from "../../reducers/data/selectors.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import PlacesSortingPropType from "../../prop-types/places-sorting.js";
import PlacesSorting from "../places-sorting/places-sorting.jsx";
import PlacePropType from "../../prop-types/place.js";
import PlacesList from "../places-list/places-list.jsx";
import CitiesMap from "../cities-map/cities-map.jsx";
import CityPropType from "../../prop-types/city.js";
import {placesSortingOptions} from "../../mocks/places-sorting-options";

const PlacesSortingWrapped = withActiveItem(PlacesSorting, false, `Open`);
const PlacesListWrapped = withActiveItem(PlacesList);

function Places(props) {
  const {places, handleItemActivate, handleItemDeactivate, handleSortingChange,
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
          handleItemSelect={handleSortingChange}
        />
        <PlacesListWrapped
          places={places}
          handleClickCardHeader={() => {}}
          className="cities__places-list places__list tabs__content"
          handleActivatePlace={handleItemActivate}
          handleDeactivatePlace={handleItemDeactivate}
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
  handleClickCardHeader: PropTypes.func.isRequired,
  activeOffer: PlacePropType,
  handleItemActivate: PropTypes.func.isRequired,
  handleItemDeactivate: PropTypes.func.isRequired,
  handleSortingChange: PropTypes.func.isRequired,
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
    handleSortingChange: (placeSortingOption) => {
      dispatch(ActionCreator.changeSorting(placeSortingOption));
    },
    handleItemActivate: (activeOffer) => {
      dispatch(ActionCreator.changeActiveOffer(activeOffer));
    },
    handleItemDeactivate: () => {
      dispatch(ActionCreator.changeActiveOffer(undefined));
    }
  };
};

export {Places};

export default connect(mapStateToProps, mapDispatchToProps)(Places);
