import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import PlacePropType from "../prop-types/place.js";

function PlacesList(props) {
  const {className, onClickCardHeader, places, onActivatePlace, onDeactivatePlace,
    articleTagClassNamePrefix, divImageWrapperClassNamePrefix, divInfoClassNamePrefix} = props;
  return (
    <div className={className}>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          onClickHeader={onClickCardHeader}
          onActivate={onActivatePlace}
          onDeactivate={onDeactivatePlace}
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
  onClickCardHeader: PropTypes.func.isRequired,
  onActivatePlace: PropTypes.func.isRequired,
  onDeactivatePlace: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  articleTagClassNamePrefix: PropTypes.string.isRequired,
  divImageWrapperClassNamePrefix: PropTypes.string.isRequired,
  divInfoClassNamePrefix: PropTypes.string
};

export default PlacesList;
