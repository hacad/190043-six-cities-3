import React from "react";
import PropTypes from "prop-types";
import CityPropType from "../../prop-types/city.js";
import classNames from "classnames";

const CitiesList = ({activeCity, cities, onCityChange, onItemActivate}) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => {
            const cityClassName = classNames({
              "locations__item-link tabs__item": true,
              "tabs__item--active": city.name === activeCity.name
            });

            return (
              <li key={city.name} className="locations__item">
                <a className={cityClassName}
                  href="#"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onItemActivate(city);
                    onCityChange(city);
                  }}>
                  <span>{city.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  activeCity: CityPropType.isRequired,
  cities: PropTypes.arrayOf(CityPropType).isRequired,
  onCityChange: PropTypes.func.isRequired,
  onItemActivate: PropTypes.func.isRequired
};

export default CitiesList;
