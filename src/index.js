import React from "react";
import ReactDOM from "react-dom";
import App from './components/App/app.jsx';

const cityPlaces = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`
];

ReactDOM.render(
    <App
      cityPlaces={cityPlaces}
      onClickHeader={() => { }}
    />,
    document.getElementById(`root`)
);
