import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ApiService } from 'app/core/services/common/api.services';
// import { ApiRoutes } from 'app/core/services/server-routes';
// import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ROUTES } from '../../app/common-files/enums/server-routes';

@Injectable({
  providedIn: 'root',
})
export class GetAccessTokenService {
  constructor(private http: HttpClient) {}
  getAccessToken(payload: any): Observable<any> {
    return this.http.post(`${ROUTES.LOG_IN}`, {
      body: payload,
    });
  }
}
