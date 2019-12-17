import React from "react";
import PropTypes from "prop-types";
import ReviewPropType from "../prop-types/review.js";
import ReviewItem from "../review-item/review-item.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import withForm from "../../hocs/with-form/with-form.js";

const ReviewFormWrapped = withForm(ReviewForm);

const ReviewsList = ({reviews, isAuthorized, hotelId}) => {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {
            reviews && reviews.length
              ? reviews.length
              : 0
          }
        </span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => {
          return (
            <ReviewItem
              key={`review-item-${review.id}`}
              review={review}
            />
          );
        })}
      </ul>
      {
        isAuthorized
          ? <ReviewFormWrapped hotelId={hotelId} />
          : null
      }
    </section>
  );
};

ReviewsList.propTypes = {
  hotelId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(ReviewPropType),
  isAuthorized: PropTypes.bool.isRequired
};

export default ReviewsList;
