import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoLoginService } from '../../../SsoAuth/Service/sso-login.service';
import { GetAccessTokenService } from '../../../SsoAuth/Service/get-access-token.service';
import { SsoAuthService } from '../../../SsoAuth/Service/sso-auth.service';
import { IdleTimerService } from '../../../SsoAuth/Service/idle-timer.service';
import { RequestMapper } from '../../request-mapper';
// import { GetAccessTokenService } from 'app/SsoAuth/Service/get-access-token.service';
// import { IdleTimerService } from 'app/SsoAuth/Service/idle-timer.service';
// import { SsoAuthService } from 'app/SsoAuth/Service/sso-auth.service';
// import { SsoLoginService } from 'app/SsoAuth/Service/sso-login.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loader-screen',
  standalone: true,
  imports: [],
  templateUrl: './loader-screen.component.html',
  styleUrl: './loader-screen.component.scss',
})
export class LoaderScreenComponent implements OnInit {
  showRetry: boolean = false;

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private ssologin: SsoLoginService,
    private ssoauth: GetAccessTokenService,
    // private toaster: ToastrService,
    private authService: SsoAuthService,
    private idleTimerService: IdleTimerService
  ) { }
  ngOnInit() {
    const token = localStorage.getItem('userToken');
    const codeVerifier = localStorage.getItem('sso_code_verifier');

    this.activeroute.queryParams.subscribe((params) => {
      const accessCode = params['accessCode'];
      console.log(accessCode);
      
      if (accessCode) {
        localStorage.setItem('accessCode', accessCode);
        const codeVerifier = localStorage.getItem('sso_code_verifier');

        const payload = {
          accessCode: accessCode,
          codeVerifier: codeVerifier,
        };

        this.ssoauth.getAccessToken(payload).subscribe({
          next: (response: any) => {
            console.log('Access Token API Response:', response);
            // if (
            //   response?.data?.newDevotee !== undefined &&
            //   response.data.newDevotee === true
            // ) {
            //   localStorage.setItem('stateToken', response.data.stateToken);
            //   // localStorage.setItem(
            //   //   'register_memberdetails',
            //   //   JSON.stringify(response.data.memberDetails)
            //   // );
            //   this.router.navigateByUrl('/register');
            //   return;
            // }

            // this.toaster.success(response.message || 'Login Successful!');
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('fullName', response.data.operatorDetails.name)
            localStorage.setItem('isLoggedIn', 'true');
            this.authService.initTimer();

            this.idleTimerService.startWatching(() => {
              console.log('Logging out due to inactivity...');
              this.authService.logOut(false);
            });
             this.router.navigateByUrl(`${RequestMapper.SIDENAV}/${RequestMapper.PROFILE_SEARCH}`);
            // this.router.navigateByUrl('/accomodation/regularbooking');
            // localStorage.setItem(
            //   'profileDetails',
            //   JSON.stringify(response.data.profileDetails)
            // );
          },
          error: (error: any) => {
            console.error('Access Token API Error:', error);
            this.showRetry = true;
            // this.toaster.error(
            //   error.msg || 'Something went wrong while logging in!'
            // );
          },
        });
      } else {
        if (token) {
          this.router.navigateByUrl(`${RequestMapper.SIDENAV}/${RequestMapper.PROFILE_SEARCH}`);
        } else {
          this.ssologin.login();
        }
      }
    });

    //  if (!token) {
    //   setTimeout(() => {
    //     this.ssologin.login()
    //   }, 1000);
    // }
  }
  onRetry() {
    this.showRetry = false;
    this.ssologin.login();
  }
}
