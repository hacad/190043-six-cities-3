import PropTypes from "prop-types";
import LocationPropType from "./location";

const CitiesMapOfferPropType = PropTypes.shape({
  data: LocationPropType,
  displaySettings: PropTypes.shape({
    icon: PropTypes.shape({
      iconUrl: PropTypes.string,
      size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
      })
    })
  })
});

export default CitiesMapOfferPropType;
