import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reducers/data/reducer.js";
import history from "../../history.js";
import ErrorLabel from "../error-label/error-label.jsx";

function BookmarkButton(props) {
  const {offerId, isFavorite, toggleFavorite, errors,
    iconWidth, iconHeight, classNamePrefix,
    isAuthorized} = props;
  const className = `${classNamePrefix}__bookmark-button button ${isFavorite && isAuthorized ? `${classNamePrefix}__bookmark-button--active` : ``}`;

  const renderToggleFavoriteError = errors && errors[`toggleFavorite`]
    ? <ErrorLabel txtLbl={errors[`toggleFavorite`]} htmlFor="toggleFavorite" />
    : ``;
  return (
    <button
      className={className}
      id="toggleFavorite"
      type="button"
      onClick={() => isAuthorized ? toggleFavorite(offerId, !isFavorite) : history.push(`/login`)}>
      <svg className="place-card__bookmark-icon property__bookmark-icon" width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? `In bookmarks` : `To bookmarks`}</span>
      {renderToggleFavoriteError}
    </button>
  );
}

BookmarkButton.propTypes = {
  offerId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  iconWidth: PropTypes.number.isRequired,
  iconHeight: PropTypes.number.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    toggleFavorite: PropTypes.string,
  })
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleFavorite: (offerId, isFavorite) => {
      dispatch(Operation.toggleFavorite(offerId, isFavorite))
        .catch((error) => {
          ownProps.errors = {"toggleFavorite": error.response && error.response.data
            ? error.response.data.error
            : error};
        });
    }
  };
}

export {BookmarkButton};

export default connect(null, mapDispatchToProps)(BookmarkButton);
