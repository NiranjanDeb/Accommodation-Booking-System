import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestMapper } from '../../request-mapper';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {


isVerifyOtp:boolean = false

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,

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
    this.router.navigate([RequestMapper.SIDENAV]);
  }

}
