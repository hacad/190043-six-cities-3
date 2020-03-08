import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PropertyPropType from "../prop-types/property.js";
import ReviewPropType from "../prop-types/review.js";
import PlacePropType from "../prop-types/place.js";
import {ActionCreator, Operation} from "../../reducers/data/reducer";
import ReducerNames from "../../reducers/reducer-names.js";
import ReviewList from "../review-list/review-list.jsx";
import {getOfferById, getComments, getSelectedPlaces} from "../../reducers/data/selectors.js";
import Header from "../header/header.jsx";
import BookmarkButton from "../bookmark-button/bookmark-button.jsx";
import withAuthorization from "../../hocs/with-authorization/with-authorization.js";
import CitiesMap from "../cities-map/cities-map.jsx";
import PlacesList from "../places-list/places-list.jsx";

const HeaderWrapped = withAuthorization(Header);
const BookmarkButtonWrapped = withAuthorization(BookmarkButton);
const ReviewListWrapped = withAuthorization(ReviewList);

class Property extends PureComponent {
  constructor(props) {
    super(props);
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
    const {offer, comments, nearOffers, hotelId, activeOffer, onActivateItem, onDeactivateItem} = this.props;

    if (!offer) {
      return null;
    }

    const activeCitiesMapOffer = activeOffer
      ? {
        data: activeOffer.location,
        displaySettings: {
          icon: {
            iconUrl: `/img/pin-active.svg`
          }
        }
      }
      : undefined;

    const nearOfferLocations = nearOffers.map((nearOffer) => {
      return {data: nearOffer.location};
    });
    nearOfferLocations.push({
      data: offer.location,
      displaySettings: {
        icon: {
          iconUrl: `/img/pin-active.svg`
        }
      }
    });

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
                  <BookmarkButtonWrapped
                    offerId={offer.id}
                    isFavorite={offer.isFavorite}
                    iconWidth={31}
                    iconHeight={33}
                    classNamePrefix="property"
                  />
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
                <ReviewListWrapped hotelId={hotelId} reviews={comments} />
              </div>
            </div>
            <CitiesMap city={offer.city} offers={nearOfferLocations} activeOffer={activeCitiesMapOffer} className="property__map map"/>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlacesList
                places={nearOffers}
                onClickCardHeader={() => {}}
                className="near-places__list places__list"
                onActivatePlace={onActivateItem}
                onDeactivatePlace={onDeactivateItem}
                articleTagClassNamePrefix="near-places__card"
                divImageWrapperClassNamePrefix="near-places"
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Property.propTypes = {
  hotelId: PropTypes.number.isRequired,
  offer: PropertyPropType,
  nearOffers: PropTypes.arrayOf(PlacePropType),
  comments: PropTypes.arrayOf(ReviewPropType),
  loadComments: PropTypes.func.isRequired,
  activeOffer: PlacePropType,
  onActivateItem: PropTypes.func.isRequired,
  onDeactivateItem: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const hotelId = parseInt(ownProps.match.params.id, 10);

  return Object.assign({}, ownProps, {
    hotelId,
    offer: getOfferById(hotelId, state),
    nearOffers: getSelectedPlaces(state)
                .filter((offer) => offer.id !== hotelId)
                .slice(0, 3),
    comments: getComments(state),
    activeOffer: state[ReducerNames.DATA].activeOffer
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadComments: () => {
      dispatch(Operation.loadComments(parseInt(ownProps.match.params.id, 10)));
    },
    onActivateItem: (activeOffer) => {
      dispatch(ActionCreator.changeActiveOffer(activeOffer));
    },
    onDeactivateItem: () => {
      dispatch(ActionCreator.changeActiveOffer(undefined));
    }
  };
};

export {Property};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
