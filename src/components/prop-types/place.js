import PropTypes from "prop-types";
import CityPropType from "./city.js";
import LocationPropType from "./location.js";

const CityPlacePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  city: CityPropType.isRequired,
  type: PropTypes.oneOf([`Apartment`, `Private room`, `Hotel`]).isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.oneOf([`Premium`]),
  name: PropTypes.string.isRequired,
  price: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.oneOf([`€`]).isRequired
  }),
  rating: PropTypes.number.isRequired,
  bookmarked: PropTypes.bool.isRequired,
  location: LocationPropType.isRequired
});

export default CityPlacePropType;
