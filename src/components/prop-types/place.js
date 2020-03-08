import PropTypes from "prop-types";
import CityPropType from "./city.js";
import LocationPropType from "./location.js";

/* eslint-disable camelcase */

const CityPlacePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  city: CityPropType.isRequired,
  type: PropTypes.oneOf([`apartment`, `room`, `hotel`, `house`]).isRequired,
  preview_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  bookmarked: PropTypes.bool,
  is_premium: PropTypes.bool.isRequired,
  location: LocationPropType.isRequired
});

export default CityPlacePropType;

/* eslint-enable */
