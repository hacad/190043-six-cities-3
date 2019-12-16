import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PropertyPropType from "../prop-types/property.js";
import ReviewPropType from "../prop-types/review.js";
import PlacePropType from "../prop-types/place.js";
import {Operation} from "../../reducers/data/reducer";
import ReviewList from "../review-list/review-list.jsx";
import {getOfferById, getComments, getSelectedPlaces} from "../../reducers/data/selectors.js";
import Header from "../header/header.jsx";
import withAuthorization from "../../hocs/with-authorization/with-authorization.js";
import NearPlaces from "../near-places/near-places.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";

const HeaderWrapped = withAuthorization(Header);
const NearPlacesWrapped = withActiveItem(NearPlaces);

class Property extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPropertyId: undefined
    };
  }

  componentDidMount() {
    this.props.loadComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.offer.id !== this.props.offer.id) {
      this.props.loadComments();
    }
  }

  render() {
    const {offer, comments, nearOffers, toggleFavorite} = this.props;

    if (!offer) {
      return null;
    }

    return (
      <div className="page">
        <HeaderWrapped />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  offer.images.map((src) => {
                    return (
                      <div key={`property__image-${src}`} className="property__image-wrapper">
                        <img className="property__image" src={src} alt="Photo studio" />
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offer.isPremium
                  ? <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ``
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer.title}
                  </h1>
                  <button
                    className={`property__bookmark-button button ${offer.isFavorite ? `property__bookmark-button--active` : ``}`}
                    type="button"
                    onClick={() => toggleFavorite(offer.id, !offer.isFavorite)}>
                    <svg className="place-card__bookmark-icon property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${offer.starRating}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    Entire place
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      offer.goods.map((good) => {
                        return (
                          <li key={`property__inside-item-${good}`} className="property__inside-item">
                            {good}
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={`/${offer.host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                    <span className="property__user-status">
                      {offer.host.isPro ? `Pro` : ``}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <ReviewList reviews={comments} />
              </div>
            </div>
          </section>
          <NearPlacesWrapped activeCity={offer.city} currentOfferLocation={offer.location} places={nearOffers} />
        </main>
      </div>
    );
  }
}

Property.propTypes = {
  offer: PropertyPropType,
  toggleFavorite: PropTypes.func.isRequired,
  nearOffers: PropTypes.arrayOf(PlacePropType),
  comments: PropTypes.arrayOf(ReviewPropType),
  loadComments: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.id, 10);

  return Object.assign({}, ownProps, {
    id,
    offer: getOfferById(id, state),
    nearOffers: getSelectedPlaces(state)
                .filter((offer) => offer.id !== id)
                .slice(0, 3),
    comments: getComments(state)
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadComments: () => {
      dispatch(Operation.loadComments(parseInt(ownProps.match.params.id, 10)));
    },
    toggleFavorite: (placeId, isFavorite) => {
      dispatch(Operation.toggleFavorite(placeId, isFavorite));
    }
  };
};

export {Property};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
