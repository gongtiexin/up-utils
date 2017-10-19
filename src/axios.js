import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

axios.default.timeout = 5000;

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          if (error.response.config.url !== '/api/user') {
            history.push('/login');
          }
          break;
        }
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default function request(config, success, error, notification = null) {
  return axios(config)
    .then((response) => {
      const { data } = response;
      if (data.errCode && data.errCode !== 0) {
        const newError = new Error();
        newError.errCode = data.errCode;
        newError.errMsg = data.errMsg;
        newError.data = data.data;
        Promise.reject(newError);
      }
      if (notification !== null && success && success.message) {
        notification.success({ message: success.message });
      }
      return response;
    })
    .catch((e) => {
      const newConfig = {};
      if (e.response.data.errMsg) {
        newConfig.description = e.response.data.errMsg;
      }
      if (notification !== null && error && error.message) {
        newConfig.message = error.message;
        notification.error(newConfig);
      }
      Promise.reject(e);
    });
}
