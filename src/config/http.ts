import {AxiosRequestConfig} from 'axios';

export const httpConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: 'https://listing.services.teko.vn',
  headers: {
    'Content-Type': 'application/json',
  },
};
