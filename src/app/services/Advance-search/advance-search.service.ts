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
    return this.http.post(ROUTES.PROFILE_SEARCH, payload);
  };

  fetchProfileDetails(fc: any): Observable<any>{
    return this.http.get(`${ROUTES.PROFILE_DETAILS}/${fc}`);
  };

  fetchProfileDetailsWithProfileY(fc: any): Observable<any> {
  return this.http.get(`${ROUTES.FC_DETAILS}/${fc}?profile=y`);
  };

  fetchVisitorsDetails(fc: any): Observable<any> {
  return this.http.get(`${ROUTES.VISITORS_DETAILS}/${fc}`);
  }

  fetchPincode(pin: any): Observable<any>{
    return this.http.get(`${ROUTES.PINCODE}/${pin}`);
  };

  fetchStates():Observable<any>{
    return this.http.get(ROUTES.STATES);
  };

  fetchBookingDetails(payload: any): Observable<any>{
    return this.http.post(ROUTES.BOOKING_DETAILS, payload);
  };

  fetchBookingId(id: any): Observable<any>{
    return this.http.get(`${ROUTES.BOOKING_ID}/${id}`);
  };

   fetchVisitDetails(payload: any): Observable<any>{
    return this.http.post(ROUTES.VISIT_DETAILS, payload);
  };

  updateMemDetails(payload: any): Observable<any>{
    return this.http.put(ROUTES.SEND_REQ_OTP, payload)
  } 

  sendReqToUpdate(payload: any): Observable<any>{
    return this.http.put(ROUTES.PROFILE_DETAILS, payload)
  }


}
