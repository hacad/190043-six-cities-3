import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import RatingStar from "../rating-star/rating-star.jsx";
import {Operation} from "../../reducers/data/reducer.js";
import ErrorLabel from "../error-label/error-label.jsx";

const ReviewForm = (props) => {
  const {hotelId, onSubmit, onSendForm, isDisabled, onChange, form, errors} = props;
  const RATING_ITEMS = [
    {value: 5, title: `perfect`},
    {value: 4, title: `good`},
    {value: 3, title: `not bad`},
    {value: 2, title: `badly`},
    {value: 1, title: `terribly`},
  ];
  const MIN_REVIEW_CHARS = 50;

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
    onSendForm(hotelId, form);
  };

  const renderRatingValidationError = !form.rating && !(errors && errors[`comment`]) && form.comment
    ? <ErrorLabel txtLbl="Please rate" htmlFor="rating" />
    : ``;

  const renderPostCommentError = errors && errors[`comment`]
    ? <ErrorLabel txtLbl={errors[`comment`]} htmlFor="comment" />
    : ``;

  return (
    <form className="reviews__form form" action="#" method="post" onChange={onChange} onSubmit={onFormSubmit}>
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
        minLength={MIN_REVIEW_CHARS}>
      </textarea>
      {renderPostCommentError}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_CHARS} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>Submit</button>
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
    rating: PropTypes.number,
    comment: PropTypes.string
  }),
  errors: PropTypes.shape({
    rating: PropTypes.string,
    comment: PropTypes.string
  })
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSendForm: (hotelId, form) => {
      dispatch(Operation.postComment(hotelId, form))
        .catch((error) => {
          ownProps.onError({"review": error.response.data.error});
        });
    }
  };
}

export {ReviewForm};

export default connect(null, mapDispatchToProps)(ReviewForm);
