import PropTypes from "prop-types";
import CityPropType from "./city.js";
import LocationPropType from "./location.js";

const PropertyPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  city: CityPropType.isRequired,
  type: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPremium: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
    avatarUrl: PropTypes.string.isRequired
  }),
  location: LocationPropType
});

export default PropertyPropType;
