import PropTypes from "prop-types";

const UserPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string,
  name: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
  isPro: PropTypes.bool.isRequired
});

export default UserPropType;
