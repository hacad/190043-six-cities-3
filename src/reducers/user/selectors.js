import reducerNames from "../reducerNames.js";

export const isAuthorized = (state) => state[reducerNames.USER].isAuthorized;
export const getUser = (state) => state[reducerNames.USER].user;
