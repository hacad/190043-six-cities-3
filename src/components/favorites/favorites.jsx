import React, {Fragment, PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CityPropType from "../../prop-types/city";
import PlacePropType from "../../prop-types/place";
import Header from "../header/header.jsx";
import PlaceCard from "../place-card/place-card.jsx";
import withAuthorization from "../../hocs/with-authorization/with-authorization.js";
import {Operation} from "../../reducers/data/reducer.js";
import {getFavorites} from "../../reducers/data/selectors.js";
import {Link} from "react-router-dom";

const HeaderWrapped = withAuthorization(Header);

class Favorites extends PureComponent {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {favorites} = this.props;

    return (
      <Fragment>
        <div style={{display: `none`}}>
          <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
        </div>
        <HeaderWrapped />
        <div className="page">
          {!favorites.length
            ? (
              <main className="page__main page__main--favorites page__main--favorites-empty">
                <div className="page__favorites-container container">
                  <section className="favorites favorites--empty">
                    <h1 className="visually-hidden">Favorites (empty)</h1>
                    <div className="favorites__status-wrapper">
                      <b className="favorites__status">Nothing yet saved.</b>
                      <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
                    </div>
                  </section>
                </div>
              </main>
            )
            : (
              <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                  <section className="favorites">
                    <h1 className="favorites__title">Saved listing</h1>

                    <ul className="favorites__list">
                      {
                        favorites.map((favorite) => {
                          return (
                            <li key={favorite.city.name} className="favorites__locations-items">
                              <div className="favorites__locations locations locations--current">
                                <div className="locations__item">
                                  <a className="locations__item-link" href="#">
                                    <span>{favorite.city.name}</span>
                                  </a>
                                </div>
                              </div>
                              <div className="favorites__places">
                                {
                                  favorite.places.map((place) => {
                                    return (
                                      <PlaceCard
                                        key={place.id}
                                        place={place}
                                        onActivate={() => {}}
                                        onDeactivate={() => {}}
                                        articleTagClassNamePrefix="favorites__card"
                                        divImageWrapperClassNamePrefix="favorites"
                                        divInfoClassNamePrefix="favorites__card-info"
                                      />
                                    );
                                  })
                                }
                              </div>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </section>
                </div>
              </main>
            )
          }
          <footer className="footer container">
            <Link className="footer__logo-link" to={`/`}>
              <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
            </Link>
          </footer>
        </div>
      </Fragment>
    );
  }
}

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
    city: CityPropType,
    places: PropTypes.arrayOf(PlacePropType)
  })).isRequired,
  loadFavorites: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    favorites: getFavorites(state)
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadFavorites: () => {
      dispatch(Operation.loadFavorites());
    }
  };
};

export {Favorites};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
