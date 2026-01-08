import { Injectable } from '@angular/core';
import { generateRandomString } from '../utils/RandomStringGenerator';
import { hashString } from '../utils/HashString';
import { appconfig } from '../Config/app.config';
import { environment } from '../../environments/environment.development';

// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SsoLoginService {
  private readonly verifierKey = 'sso_code_verifier';
  private readonly challengeKey = 'sso_code_challenge';
  private readonly tokenKey = 'access_token';

  constructor() {}

  login(): void {
    const codeVerifier = generateRandomString(20);
    const codeChallenge = hashString(codeVerifier);

    localStorage.setItem(this.verifierKey, codeVerifier);
    localStorage.setItem(this.challengeKey, codeChallenge);
    console.log(codeVerifier);

    let redirectUrl = ``;
    if(environment.production)redirectUrl = `${environment.SSO_URL}?appId=${appconfig.appId}&codeChallenge=${codeChallenge}`;
    else redirectUrl = `${environment.SSO_URL}?appId=${appconfig.appId}&codeChallenge=${codeChallenge}&returnUrl=${environment.localhostUrl}`;
    window.location.href = redirectUrl;
  }
}
