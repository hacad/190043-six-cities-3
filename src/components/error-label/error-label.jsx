import React from "react";
import PropTypes from "prop-types";

function ErrorLabel({txtLbl, htmlFor}) {
  return (
    <label htmlFor={htmlFor} style={{color: `red`}}>
      {txtLbl}
    </label>
  );
}

ErrorLabel.propTypes = {
  txtLbl: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired
};

export default ErrorLabel;
