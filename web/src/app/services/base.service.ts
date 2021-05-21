import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

export class BaseService {
  apiProtocol = 'http';
  constructor(protected httpClient: HttpClient) {
    if (environment.production) {
      this.apiProtocol = 'http';
    }
  }

  getbaseUrl() {
    let hostname = location.host;
    hostname = hostname.replace(':4200',':8000')
    return `${this.apiProtocol}://${hostname}`;
  }
}