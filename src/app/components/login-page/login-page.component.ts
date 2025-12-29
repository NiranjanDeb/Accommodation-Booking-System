import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestMapper } from '../../request-mapper';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {


isVerifyOtp:boolean = false
fc = new FormControl('')
otp = new FormControl('')

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthServiceService

  ) {

  }
  ngOnInit(): void {
    console.log('lc working');

  }

  //  selectAccount(account: string) {
  //   if (account === this.selectedAccount) return;
  //   if (!this.accounts.includes(account)) return;
  //   console.log('****');
  //   // this.state = { ...initialState };
  //   this.selectedAccount = account;
  //   // this.loginForm.reset();
  //   // console.log(this.state);
  //   this.cdr.detectChanges();
  // }

  sendOtp(){
    this.isVerifyOtp= true
  }

  onLogin() {
    const payload = {
      fc : this.fc?.value,
      otp: this.otp?.value
    }

    this.authService.getAuthenticate(payload).subscribe({
      next: (res)=>{
          localStorage.setItem('auth', res.data.token)
           this.router.navigate([`${RequestMapper.SIDENAV}/${RequestMapper.PROFILE_SEARCH}`]);
      }
    })
   
  }

}
