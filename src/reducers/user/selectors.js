import reducerNames from "../reducer-names.js";

export const isAuthorized = (state) => state[reducerNames.USER].isAuthorized;
export const getUser = (state) => state[reducerNames.USER].user;
