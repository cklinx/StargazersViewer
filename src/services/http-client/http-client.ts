import axios from 'axios';
import {APP_VERSION, OS_VERSION} from '@stargazers/services/device-info';

const config = {
  baseURL: 'https://api.github.com/',
  headers: {
    'client-app-version': APP_VERSION,
    'client-os-version': OS_VERSION,
  },
};
const instance = axios.create(config);
export default instance;
