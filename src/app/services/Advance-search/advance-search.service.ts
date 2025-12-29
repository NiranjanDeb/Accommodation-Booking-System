import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../../common-files/enums/server-routes';

@Injectable({
  providedIn: 'root'
})
export class AdvanceSearchService {

  constructor(
    private http: HttpClient
  ) { }

  fetchProfile(payload: any): Observable<any>{
    return this.http.post(ROUTES.PROFILE_SEARCH, payload)
  }

  fetchProfileDetails(fc: any): Observable<any>{
    return this.http.get(`${ROUTES.PROFILE_SEARCH}/${fc}`)
  }

  fetchPincode(pin: any): Observable<any>{
    return this.http.get(`${ROUTES.PINCODE}/${pin}`)
  }
}
