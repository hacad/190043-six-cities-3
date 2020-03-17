import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import RatingStar from "../rating-star/rating-star.jsx";
import {Operation} from "../../reducers/data/reducer.js";
import ErrorLabel from "../error-label/error-label.jsx";

const ReviewForm = (props) => {
  const {hotelId, onSubmit, onSendForm,
    isDisabled, onChange, form,
    errors, activeItem: isCommentedAlready, onItemActivate} = props;
  const RATING_ITEMS = [
    {value: 5, title: `perfect`},
    {value: 4, title: `good`},
    {value: 3, title: `not bad`},
    {value: 2, title: `badly`},
    {value: 1, title: `terribly`},
  ];
  const MIN_REVIEW_CHARS = 50;
  const MAX_REVIEW_CHARS = 300;

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    onSendForm(hotelId, form)
      .then(() => {
        onItemActivate(true);
        onSubmit();
      })
      .catch(() => {});
  };

  const renderRatingValidationError = !form.rating && !(errors && errors[`comment`]) && form.comment
    ? <ErrorLabel textLabel="Please rate" htmlFor="rating" />
    : ``;

  const renderPostCommentError = errors && errors[`comment`]
    ? <ErrorLabel textLabel={errors[`comment`]} htmlFor="comment" />
    : ``;

  return (
    <form className="reviews__form form" action="#" method="post" onChange={onChange} onSubmit={handleSubmitForm}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RATING_ITEMS.map((item) => {
            return (
              <RatingStar
                key={`rating_item-${item.title}`}
                title={item.title}
                value={item.value}
              />
            );
          })
        }
      </div>
      {renderRatingValidationError}
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={MIN_REVIEW_CHARS}
        maxLength={MAX_REVIEW_CHARS}
        required>
      </textarea>
      {renderPostCommentError}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_CHARS} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled || isCommentedAlready}>Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  hotelId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSendForm: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    rating: PropTypes.string,
    comment: PropTypes.string
  }),
  errors: PropTypes.shape({
    rating: PropTypes.string,
    comment: PropTypes.string
  }),
  onItemActivate: PropTypes.func.isRequired,
  activeItem: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSendForm: (hotelId, form) => {
      return dispatch(Operation.postComment(hotelId, form))
        .catch((error) => {
          const errorMessage =
            (error && error.response && error.response.status && error.response.status === 503)
              ? `Server is unavailable. Please try again later.`
              : ((error && error.response && error.response.data && error.response.data.error)
            || (error && error.message)
            || error);
          ownProps.onError({"comment": errorMessage});

          throw error;
        });
    }
  };
}

export {ReviewForm};

export default connect(null, mapDispatchToProps)(ReviewForm);
