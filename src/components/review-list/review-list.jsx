import React from "react";
import PropTypes from "prop-types";
import ReviewPropType from "../prop-types/review.js";
import ReviewItem from "../review-item/review-item.jsx";
import {ReviewForm} from "../review-form/review-form.jsx";

const ReviewsList = ({reviews}) => {
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
      <ReviewForm />
    </section>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(ReviewPropType)
};

export default ReviewsList;
