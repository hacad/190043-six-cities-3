import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api.js";
import reducer from "./reducers/reducer.js";
import {Operation} from "./reducers/data/reducer.js";
import App from "./components/app/app.jsx";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch.js";

const AppWrapped = withScreenSwitch(App);
const api = createAPI((...args) => store.dispatch(...args));

let store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.loadOffers());

ReactDOM.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    document.getElementById(`root`)
);
