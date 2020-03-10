import PropTypes from 'prop-types';

const LocationPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number
});

export default LocationPropType;
