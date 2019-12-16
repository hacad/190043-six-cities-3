import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import PlacePropType from "../prop-types/place.js";
import Places from "../places/places.jsx";
import PlacesEmpty from "../places-empty/places-empty.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import CityPropType from "../prop-types/city.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import withAuthorization from "../../hocs/with-authorization/with-authorization.js";
import withSorting from "../../hocs/with-sorting/with-sorting.js";

const HeaderWrapped = withAuthorization(Header);
const CitiesListWrapped = withActiveItem(CitiesList);

function Main(props) {
  const {places, city: activeCity, cities, onChangeCity} = props;
  const PlacesWrapped = withSorting(withActiveItem(Places), places, `ASC`, `places`);

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
            {places && places.length
              ? <PlacesWrapped
                onClickCardHeader={() => {}}
                className="cities__places-list places__list tabs__content"
                activeCity={activeCity}
              />
              : <PlacesEmpty cityName={activeCity.name} />
            }
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
};

export default Main;
