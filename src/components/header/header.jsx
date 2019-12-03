import React from "react";
import PropTypes from "prop-types";
import UserPropType from "../prop-types/user.js";
import {Link} from "react-router-dom";

function Header({isAuthorized, user}) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={`/`} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {isAuthorized
                  ? (
                    <Link className="header__nav-link header__nav-link--active" to={`/favorites`}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${user.avatarUrl})`}}>
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                    </Link>
                  )
                  : (
                    <Link className="header__nav-link header__nav-link--profile" to={`/login`}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Sign In</span>
                    </Link>
                  )
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  user: UserPropType
};

export default Header;
