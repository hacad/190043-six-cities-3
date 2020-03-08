import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import CityPropType from "../prop-types/city.js";
import CitiesMapOfferPropType from "../prop-types/cities-map-offer.js";

class CitiesMap extends PureComponent {
  constructor(props) {
    super(props);
    this._map = null;
    this._markerLayers = [];
    this._zoom = 12;
  }

  render() {
    return (
      <section id="map" className={this.props.className}></section>
    );
  }

  componentDidMount() {
    this._initMap();
    this._addMarkers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city.name !== this.props.city.name || prevProps.activeOffer !== this.props.activeOffer) {
      const cityLocation = [this.props.city.location.latitude, this.props.city.location.longitude];
      this._map.setView(cityLocation, this.zoom);
      this._resetMarkers();
    }
  }

  componentWillUnmount() {
    this._map.remove();
  }

  _initMap() {
    const {city} = this.props;
    const cityLocation = [city.location.latitude, city.location.longitude];
    const zoom = city.zoom ? city.zoom : this._zoom;

    this._map = leaflet.map(`map`, {
      center: cityLocation,
      zoom,
      zoomControl: true,
      marker: true
    });
    this._map.setView(cityLocation, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);
  }

  _addMarkers() {
    const defaultDisplaySettings = {
      icon: {
        iconUrl: `/img/pin.svg`,
        iconSize: {
          width: 30,
          height: 30
        }
      }
    };

    let initializedIcons = {};
    const {offers, activeOffer} = this.props;
    for (let offer of offers) {
      let {displaySettings = {}} = (activeOffer
                                    && offer.data.latitude === activeOffer.data.latitude
                                    && offer.data.longitude === activeOffer.data.longitude)
        ? activeOffer
        : offer;
      const {
        icon: {
          iconUrl = defaultDisplaySettings.icon.iconUrl,
          iconSize: {
            width = defaultDisplaySettings.icon.iconSize.width,
            height = defaultDisplaySettings.icon.iconSize.height
          } = {}
        } = {}
      } = displaySettings;

      displaySettings = {
        icon: {
          iconUrl,
          iconSize: [width, height]
        }
      };

      let icon = initializedIcons[displaySettings.icon.iconUrl];
      if (!icon) {
        icon = leaflet.icon(displaySettings.icon);
        initializedIcons[displaySettings.icon.iconUrl] = icon;
      }
      const markerLayer =
        leaflet
          .marker([offer.data.latitude, offer.data.longitude], {icon})
          .addTo(this._map);

      this._markerLayers.push(markerLayer);
    }
  }

  _removeMarkers() {
    for (let markerLayer of this._markerLayers) {
      this._map.removeLayer(markerLayer);
    }
  }

  _resetMarkers() {
    this._removeMarkers();
    this._markerLayers = [];
    this._addMarkers();
  }
}


CitiesMap.propTypes = {
  city: CityPropType.isRequired,
  offers: PropTypes.arrayOf(CitiesMapOfferPropType).isRequired,
  activeOffer: CitiesMapOfferPropType,
  className: PropTypes.string.isRequired
};

export default CitiesMap;
