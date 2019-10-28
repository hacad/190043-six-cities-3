import PropTypes from "prop-types";


const PlacePropType = {
  id: PropTypes.number.isRequired,
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    })
  }).isRequired,
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
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired
};

export default PlacePropType;
