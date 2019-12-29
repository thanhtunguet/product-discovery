import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

export class Repository {
  protected http: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.http = axios.create(config);
  }

  public setBaseURL(url: string) {
    this.http.defaults.baseURL = url;
  }
}
