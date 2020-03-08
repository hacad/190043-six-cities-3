import React, {Fragment} from "react";
import PropTypes from "prop-types";
import CityPropType from "../prop-types/city.js";
import PlacePropType from "../prop-types/place.js";
import LocationPropType from "../prop-types/location.js";
import CitiesMap from "../cities-map/cities-map.jsx";
import PlacesList from "../places-list/places-list.jsx";

function NearPlaces({places, activeCity, currentOfferLocation, activeItem, onActivateItem, onDeactivateItem}) {
  const activeOffer = activeItem
    ? {
      data: activeItem.location,
      displaySettings: {
        icon: {
          iconUrl: `/img/pin-active.svg`
        }
      }
    }
    : undefined;

  const nearOfferLocations = places.map((nearOffer) => {
    return {data: nearOffer.location};
  });
  nearOfferLocations.push({
    data: currentOfferLocation,
    displaySettings: {
      icon: {
        iconUrl: `/img/pin-active.svg`
      }
    }
  });
  return (
    <Fragment>
      <CitiesMap city={activeCity} offers={nearOfferLocations} activeOffer={activeOffer} className="property__map map"/>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesList
            places={places}
            onClickCardHeader={() => {}}
            className="near-places__list places__list"
            onActivatePlace={onActivateItem}
            onDeactivatePlace={onDeactivateItem}
            articleTagClassNamePrefix="near-places__card"
            divImageWrapperClassNamePrefix="near-places"
          />
        </section>
      </div>
    </Fragment>
  );
}

NearPlaces.propTypes = {
  places: PropTypes.arrayOf(PlacePropType),
  activeCity: CityPropType.isRequired,
  currentOfferLocation: LocationPropType.isRequired,
  activeItem: PlacePropType,
  onActivateItem: PropTypes.func.isRequired,
  onDeactivateItem: PropTypes.func.isRequired
};

export default NearPlaces;
