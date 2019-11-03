import PropTypes from "prop-types";
import LocationPropType from "./location.js";

const CityPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  location: LocationPropType
});

export default CityPropType;
