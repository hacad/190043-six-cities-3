import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import CityPlacePropType from "../prop-types/city-place.js";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this._activateCardHandler = this._activateCardHandler.bind(this);
    this._deactivateCardHandler = this._deactivateCardHandler.bind(this);

    this.state = {
      activeCard: null
    };
  }

  render() {
    const {
      cityPlaces,
      onClickCardHeader
    } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {cityPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onClickHeader={onClickCardHeader}
            onActivate={this._activateCardHandler}
            onDeactivate={this._deactivateCardHandler}
          />
        ))}
      </div>
    );
  }

  _activateCardHandler(place) {
    this.setState({activeCard: place});
  }

  _deactivateCardHandler() {
    this.setState({activeCard: null});
  }
}

PlacesList.propTypes = {
  cityPlaces: PropTypes.arrayOf(CityPlacePropType).isRequired,
  onClickCardHeader: PropTypes.func.isRequired
};

export default PlacesList;
