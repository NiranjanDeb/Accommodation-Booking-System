import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from 'app/core/services/common/api.services';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { IdleTimerService } from './idle-timer.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SsoAuthService {
  private refreshUrl = '/auth/refresh';
  private logoutUrl = '/auth/logout';

  private timerInterval: any;
  public tokenExpiresInSecond: BehaviorSubject<any> = new BehaviorSubject(null);
  public isRefreskTokenApiCalled = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private idleTimerService: IdleTimerService
  ) {}

  public logOut(isAllLogout: boolean = true) {
    this.clearTimer();
    localStorage.clear();
    this.idleTimerService.stopWatching();
    if(isAllLogout){
      const redirectUrl = `${environment.SSO_URL}?logout=true`;
      window.location.href = redirectUrl;
    }
    else{
      // may be show a pop up that session has expired due to inactivity
    }
    
    // this.router.navigate(['/']);
  }

  public initTimer() {
    try {
      this.clearTimer();
      const accessToken = localStorage.getItem('userToken');
      if (typeof accessToken !== 'undefined' && accessToken) {
        const accessTokenSplit = accessToken.split('.');
        const accessPayloadPart = accessTokenSplit[1];
        const decodedPayload = JSON.parse(window.atob(accessPayloadPart));
        const tokenExpiryTimestamp = decodedPayload.exp;
        const timeRemainingInSeconds = Math.round(
          new Date(tokenExpiryTimestamp).getTime() - new Date().getTime() / 1000
        );
        this.tokenExpiresInSecond.next(timeRemainingInSeconds);
        this.timerInterval = setInterval(() => {
          this.tokenExpiresInSecond.next(
            this.tokenExpiresInSecond.getValue() - 1
          );
        }, 1000);
      }
    } catch (e) {
      console.error('initTimer ERROR: ', e);
    }
  }

  public clearTimer() {
    clearInterval(this.timerInterval);
  }

  public renewAccessToken() {
    this.isRefreskTokenApiCalled = true;
    this.http.get(`${environment.BASE_URL}/auth/refresh`).subscribe({
      next: (response: any) => {
        // console.log('REFRESH');
        // if already logged in then only accept the new token
        if(localStorage.getItem('auth')){
          localStorage.setItem('userToken', response?.data?.token);
          this.initTimer();
        }
        this.isRefreskTokenApiCalled = false;
      },
      error: (error) => {
        console.log(error);
        this.isRefreskTokenApiCalled = false;
      },
    });
  }
}
