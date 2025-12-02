import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router
  ) {

  }
  ngOnInit(): void {
    console.log('lc working');

  }

  onLogin() {
    this.router.navigate([RequestMapper.SIDENAV]);
  }

}
