import React from "react";
import PropTypes from "prop-types";
import PlacePropType from "../prop-types/place.js";
import {connect} from "react-redux";
import {Operation} from "../../reducers/data/reducer.js";

const PlaceCard = (props) => {
  const {place, onClickHeader, onActivate, onDeactivate, toggleFavorite} = props;
  const {type, previewImage, isPremium, title, price, rating, id, isFavorite} = place;

  return (
    <article className="cities__place-card place-card"
      onMouseEnter={() => {
        onActivate(place);
      }}
      onMouseLeave={() => {
        onDeactivate(place);
      }}
    >
      {isPremium
        ? (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
        : ``
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? `property__bookmark-button--active` : ``}`}
            type="button"
            onClick={() => toggleFavorite(id, !isFavorite)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={onClickHeader}>
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PlacePropType.isRequired,
  onClickHeader: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favorite: PropTypes.shape({
    placeId: PropTypes.number,
    isFavorite: PropTypes.bool
  })
};

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    favorite: state.data.favorite
  });
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFavorite: (placeId, isFavorite) => {
      dispatch(Operation.toggleFavorite(placeId, isFavorite));
    }
  };
}

export {PlaceCard};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
