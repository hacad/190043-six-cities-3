import React from "react";
import PropTypes from "prop-types";
import PlacePropType from "../../prop-types/place.js";
import BookmarkButton from "../bookmark-button/bookmark-button.jsx";
import withAuthorization from "../../hocs/with-authorization/with-authorization.js";
import {Link} from "react-router-dom";

const BookmarkButtonWrapped = withAuthorization(BookmarkButton);

const PlaceCard = (props) => {
  const {place, onHeaderClick, onActivate, onDeactivate,
    articleTagClassNamePrefix, divImageWrapperClassNamePrefix,
    divInfoClassNamePrefix} = props;
  const {type, previewImage, isPremium, title, price, starRating: rating, id, isFavorite} = place;

  return (
    <article className={`${articleTagClassNamePrefix} place-card`}
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
      <div className={`${divImageWrapperClassNamePrefix}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className={`${divInfoClassNamePrefix} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButtonWrapped
            offerId={id}
            isFavorite={isFavorite}
            iconWidth={18}
            iconHeight={19}
            classNamePrefix="place-card"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={onHeaderClick ? onHeaderClick : () => {}}>
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PlacePropType.isRequired,
  onHeaderClick: PropTypes.func,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  articleTagClassNamePrefix: PropTypes.string.isRequired,
  divImageWrapperClassNamePrefix: PropTypes.string.isRequired,
  divInfoClassNamePrefix: PropTypes.string
};

export default PlaceCard;
