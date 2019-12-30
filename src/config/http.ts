import {AxiosRequestConfig} from 'axios';

export const httpConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: 'https://listing.stage.tekoapis.net',
  headers: {
    'Content-Type': 'application/json',
  },
};
