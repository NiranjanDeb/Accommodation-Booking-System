import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SsoAuthService } from '../SsoAuth/Service/sso-auth.service';
import { IdleTimerService } from '../SsoAuth/Service/idle-timer.service';
import { ssoConfig } from '../SsoAuth/sso.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'accomodation_correction';


  // deviceType: DeviceType = 'desktop';

  constructor(
    // private deviceTypeService: DeviceDetectorService,
    // private themeToggleService: ThemeToggleService,
    private authService: SsoAuthService,
    private idleTimerService: IdleTimerService,
    private router: Router
  ) {
    // this.themeToggleService.applyTheme('dark-gold');

    // this.deviceTypeService.deviceType$.subscribe((type: any) => {
    //   this.deviceType = type;
      // console.log("Device Type :",type);
    // });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.authService.initTimer();
      this.idleTimerService.startWatching(() => {
        console.log('Logging out due to inactivity...');
        this.authService.logOut(false);
      });
    }

    this.authService.tokenExpiresInSecond.subscribe((value: number) => {
      // console.log('COUNT DOWN: ', value);
      if (value) {
        if (value <= 0) {
          this.authService.logOut(false);
        }
        if (value && value <= ssoConfig.timeBeforeCallingRefreshInSecs && !this.authService.isRefreskTokenApiCalled) {
          console.log('REFRESH MEE');
          this.authService.renewAccessToken();
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.idleTimerService.stopWatching();
  }
}
