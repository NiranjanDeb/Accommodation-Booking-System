import { environment } from "../environments/environment.development";

export enum ssoConfig {
  tokenExpiresInMin = 480,
  timeBeforeCallingRefreshInSecs = environment.timeBeforeCallingRefreshInSecs
}
