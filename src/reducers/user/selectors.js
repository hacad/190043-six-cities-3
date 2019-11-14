import reducerNames from "../reducerNames.js";

export const checkAuthorization = (state) => state[reducerNames.USER].isAuthorizationRequired;
