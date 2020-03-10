import axios from 'axios';

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err && err.response && err.response.config && err.response.config.passThrough) {
      return;
    }

    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      onLoginFail();
      return;
    }

    return;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
