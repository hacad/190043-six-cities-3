import React from "react";
import PropTypes from "prop-types";
import PlacePropType from "../prop-types/place.js";

const PlaceCard = (props) => {
  const {place, onClickHeader, onActivate, onDeactivate} = props;
  const {type, img, category, name, price, rating} = place;

  return (
    <article className="cities__place-card place-card"
      onMouseEnter={() => {
        onActivate(place);
      }}
      onMouseLeave={() => {
        onDeactivate(place);
      }}
    >
      {category
        ? (
          <div className="place-card__mark">
            <span>{category}</span>
          </div>
        )
        : ``
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={img} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price.currency}{price.value}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
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
          <a href="#">{name}</a>
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
  onDeactivate: PropTypes.func.isRequired
};

export default PlaceCard;
