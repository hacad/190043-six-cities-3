import React from "react";
import PropTypes from "prop-types";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import PlacesSorting from "../places-sorting/places-sorting.jsx";
import PlacePropType from "../prop-types/place.js";
import PlacesList from "../places-list/places-list.jsx";
import CitiesMap from "../cities-map/cities-map.jsx";
import CitiesMapOffer from "../prop-types/cities-map-offer.js";
import CityPropType from "../prop-types/city.js";
import {placesSortingOptions, defaultSortingOptionItem} from "../../mocks/places-sorting-options";

const PlacesSortingWrapped = withActiveItem(
    withActiveItem(PlacesSorting, defaultSortingOptionItem),
    false,
    `Opened`);
const PlacesListWrapped = withActiveItem(PlacesList);

function Places(props) {
  const {places, onActivateItem, onDeactivateItem, onChangeSorting, activeCity, activeItem} = props;
  const offers = places.map((place) => {
    return {data: place.location};
  });
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

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} {offers.length === 1 ? `place` : `places`} to stay in {places[0].city.name}</b>
        <PlacesSortingWrapped
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
        <CitiesMap city={activeCity} offers={offers} activeOffer={activeOffer} className="property__map map"/>
      </div>
    </div>
  );
}

Places.propTypes = {
  places: PropTypes.arrayOf(PlacePropType).isRequired,
  className: PropTypes.string.isRequired,
  onClickCardHeader: PropTypes.func.isRequired,
  activeItem: CitiesMapOffer,
  onActivateItem: PropTypes.func.isRequired,
  onDeactivateItem: PropTypes.func.isRequired,
  onChangeSorting: PropTypes.func.isRequired,
  activeCity: CityPropType.isRequired
};

export default Places;
