import PropTypes from "prop-types";

const PlacesSortingPropType = PropTypes.shape({
  caption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  order: PropTypes.string
});

export default PlacesSortingPropType;
