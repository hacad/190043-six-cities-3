import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import PlacePropType from "../prop-types/place.js";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleActivateCard = this._handleActivateCard.bind(this);
    this._handleDeactivateCard = this._handleDeactivateCard.bind(this);
  }

  render() {
    const {
      onClickCardHeader,
      places,
      className
    } = this.props;

    return (
      <div className={className}>
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onClickHeader={onClickCardHeader}
            onActivate={this._handleActivateCard}
            onDeactivate={this._handleDeactivateCard}
          />
        ))}
      </div>
    );
  }

  _handleActivateCard(place) {
    this.props.onActivateItem(place);
  }

  _handleDeactivateCard() {
    this.props.onDeactivateItem();
  }
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PlacePropType).isRequired,
  onClickCardHeader: PropTypes.func.isRequired,
  onActivateItem: PropTypes.func.isRequired,
  onDeactivateItem: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

export default PlacesList;
