import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api.js";
import reducer from "./reducers/reducer.js";
import {ActionCreator, Operation as DataOperations} from "./reducers/data/reducer.js";
import {Operation as UserOperations} from "./reducers/user/reducer.js";
import App from "./components/app/app.jsx";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch.js";
import {Router} from "react-router-dom";
import history from "./history.js";

const AppWrapped = withScreenSwitch(App);
const api = createAPI(() => history.push(`/login`));

let store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(UserOperations.getAuthStatus());
store.dispatch(DataOperations.loadOffers())
      .then((offers) => {
        if (offers && offers.length > 0) {
          store.dispatch(ActionCreator.changeCity(offers[0].city));
          ReactDOM.render(
              <Provider store={store}>
                <Router history={history}>
                  <AppWrapped />
                </Router>
              </Provider>,
              document.getElementById(`root`)
          );
        } else {
          ReactDOM.render(
              <div>Something goes wrong. Please try again later</div>,
              document.getElementById(`root`)
          );
        }
      });
