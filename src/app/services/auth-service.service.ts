import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../common-files/enums/server-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getAuthenticate(body: any): Observable<any>{
    return this.http.post(ROUTES.LOG_IN,  body)
  }

  logoutUser(): Observable<any>{
    return this.http.delete(ROUTES.LOG_OUT)
  }
}
