import React, {Fragment} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import PlacesList from "../places-list/places-list.jsx";
import CitiesMap from "../cities-map/cities-map.jsx";
import PlacePropType from "../prop-types/place.js";
import CityPropType from "../prop-types/city.js";
import CitiesMapOffer from "../prop-types/cities-map-offer.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import withAuthorization from "../../hocs/with-authorization/with-authorization.js";

const HeaderWrapped = withAuthorization(Header);
const CitiesListWrapped = withActiveItem(CitiesList);
const PlacesListWrapped = withActiveItem(PlacesList);

function Main(props) {
  const {places, city: activeCity, cities, onChangeCity, activeOffer} = props;
  const offers = places.map((place) => {
    return {data: place.location};
  });

  return (
    <Fragment>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page page--gray page--main">
        <HeaderWrapped />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesListWrapped
            activeCity={activeCity}
            cities={cities}
            onChangeCity={onChangeCity}
          />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} {offers.length === 1 ? `place` : `places`} to stay in {activeCity.name}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>
                  {/*
                  <select className="places__sorting-type" id="places-sorting">
                    <option className="places__option" value="popular" selected="">Popular</option>
                    <option className="places__option" value="to-high">Price: low to high</option>
                    <option className="places__option" value="to-low">Price: high to low</option>
                    <option className="places__option" value="top-rated">Top rated first</option>
                  </select>
                  */}
                </form>
                <PlacesListWrapped
                  places={places}
                  onClickCardHeader={() => {}}
                  className="cities__places-list places__list tabs__content"
                />
              </section>
              <div className="cities__right-section">
                <CitiesMap city={activeCity} offers={offers} activeOffer={activeOffer} className="property__map map"/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}

Main.propTypes = {
  city: CityPropType,
  cities: PropTypes.arrayOf(CityPropType).isRequired,
  places: PropTypes.arrayOf(PlacePropType).isRequired,
  onChangeCity: PropTypes.func.isRequired,
  activeOffer: CitiesMapOffer
};

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    activeOffer: state.data.activeOffer
  });
}

export {Main};

export default connect(mapStateToProps)(Main);
