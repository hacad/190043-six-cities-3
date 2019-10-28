import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

class CitiesMap extends PureComponent {
  render() {
    return (
      <section id="map" className="cities__map map"></section>
    );
  }

  componentDidMount() {
    const city = [52.3709553943508, 4.89309666406198];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: true,
      marker: true
    });
    map.setView(city, zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
    const offers = this.props.offers;
    for (let offer of offers) {
      leaflet
          .marker([offer.latitude, offer.longitude], {icon})
          .addTo(map);
    }
  }
}

CitiesMap.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  })).isRequired
};

export default CitiesMap;
