import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app.jsx';

import {default as cityPlaces} from './mocks/offers.js';

ReactDOM.render(
    <App
      cityPlaces={cityPlaces}
      onClickHeader={() => { }}
    />,
    document.getElementById(`root`)
);
