import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../PlaceCard/placecard.jsx';

class PlaceList extends PureComponent {
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

PlaceList.propTypes = {
  cityPlaces: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([`Apartment`, `Private room`, `Hotel`]).isRequired,
        img: PropTypes.string.isRequired,
        category: PropTypes.oneOf([`Premium`]),
        name: PropTypes.string.isRequired,
        price: PropTypes.shape({
          value: PropTypes.number.isRequired,
          currency: PropTypes.oneOf([`€`]).isRequired
        }).isRequired,
        rating: PropTypes.number.isRequired,
        bookmarked: PropTypes.bool.isRequired
      })
  ).isRequired,
  onClickCardHeader: PropTypes.func.isRequired
};

export default PlaceList;
