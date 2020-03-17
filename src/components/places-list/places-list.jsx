import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import PlacePropType from "../../prop-types/place.js";

function PlacesList(props) {
  const {className, onCardHeaderClick, places, onPlaceActivate, onPlaceDeactivate,
    articleTagClassNamePrefix, divImageWrapperClassNamePrefix, divInfoClassNamePrefix} = props;
  return (
    <div className={className}>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          onHeaderClick={onCardHeaderClick}
          onActivate={onPlaceActivate}
          onDeactivate={onPlaceDeactivate}
          articleTagClassNamePrefix={articleTagClassNamePrefix}
          divImageWrapperClassNamePrefix={divImageWrapperClassNamePrefix}
          divInfoClassNamePrefix={divInfoClassNamePrefix}
        />
      ))}
    </div>
  );
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PlacePropType).isRequired,
  onCardHeaderClick: PropTypes.func.isRequired,
  onPlaceActivate: PropTypes.func.isRequired,
  onPlaceDeactivate: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  articleTagClassNamePrefix: PropTypes.string.isRequired,
  divImageWrapperClassNamePrefix: PropTypes.string.isRequired,
  divInfoClassNamePrefix: PropTypes.string
};

export default PlacesList;
