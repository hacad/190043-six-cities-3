import React from "react";
import PropTypes from "prop-types";

function ErrorLabel({textLabel, htmlFor}) {
  return (
    <label htmlFor={htmlFor} style={{color: `red`}}>
      {textLabel}
    </label>
  );
}

ErrorLabel.propTypes = {
  textLabel: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired
};

export default ErrorLabel;
