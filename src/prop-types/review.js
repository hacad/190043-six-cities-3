import PropTypes from "prop-types";
import UserPropType from "./user.js";

const ReviewPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: UserPropType,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
});

export default ReviewPropType;
