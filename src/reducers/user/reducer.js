import reducerNames from "../reducerNames.js";

const initialState = {
  isAuthorizationRequired: false
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `${reducerNames.USER}_REQUIRE_AUTHORIZATION`
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status
    };
  }
};

const user = function (state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      Object.assign(newState, state, {
        isAuthorizationRequired: action.payload
      });
      break;
    default:
      return state;
  }

  return newState;
};

export {ActionType, ActionCreator, user};
