import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {httpConfig} from 'config/http';

export class Repository {
  protected http: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.http = axios.create(httpConfig);
  }

  public setBaseURL(url: string) {
    this.http.defaults.baseURL = url;
  }
}
