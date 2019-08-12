import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class BusinessOperationsService {
  public serverPath: string = environment.serverUrl;
  // public serverPath: string = 'http://gestion-api-auth-consum.apps.okd.openshifthub.ml/';

  login(): string {
    return this.serverPath + 'login';
  }
  logout(): string {
    return this.serverPath + 'logout';
  }
  getCsrf(): string {
    return this.serverPath + 'services/rest/security/v1/csrftoken';
  }
}
