import React, {Fragment} from "react";
import PropTypes from "prop-types";

function App({renderScreen}) {
  return (
    <Fragment>
      {renderScreen()}
    </Fragment>
  );
}

App.propTypes = {
  renderScreen: PropTypes.func.isRequired
};

export default App;
