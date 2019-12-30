import {AxiosRequestConfig} from 'axios';
import Axios from 'axios-observable';
import {httpConfig} from 'config/http';

export class Repository {
  protected http: Axios;

  constructor(config?: AxiosRequestConfig) {
    this.http = Axios.create(httpConfig);
  }

  public setBaseURL(url: string) {
    this.http.defaults.baseURL = url;
  }
}
