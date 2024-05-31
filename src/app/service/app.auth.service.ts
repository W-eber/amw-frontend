import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly usernameObservable: Observable<string> = this.usernameSubject.asObservable();
  private useraliasSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly useraliasObservable: Observable<string> = this.useraliasSubject.asObservable();
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly accessTokenObservable: Observable<string> = this.accessTokenSubject.asObservable();

  private _decodedAccessToken: any;
  private _accessToken = '';

  get decodedAccessToken() {
    return this._decodedAccessToken;
  }

  get accessToken() {
    return this._accessToken;
  }

  constructor(
    private oauthService: OAuthService,
    private authConfig: AuthConfig,
    private router: Router
  ) {
    this.handleEvents(null);
  }

  async initAuth(): Promise<any> {
    return new Promise<void>((resolve) => {
      this.oauthService.configure(this.authConfig);
      this.oauthService.events.subscribe(e => this.handleEvents(e));
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        if (this.isAuthenticated()) {
          this.router.navigate(['/home']);
        }
        resolve();
      });
      this.oauthService.setupAutomaticSilentRefresh();
    });
  }

  public getRoles(): Observable<Array<string>> {
    if (this._decodedAccessToken !== null) {
      return new Observable<Array<string>>(observer => {
        if (this._decodedAccessToken.resource_access && this._decodedAccessToken.resource_access.amw && this._decodedAccessToken.resource_access.amw.roles) {
          if (Array.isArray(this._decodedAccessToken.resource_access.amw.roles)) {
            const resultArr = this._decodedAccessToken.resource_access.amw.roles.map((r: string) => r.replace('ROLE_', ''));
            observer.next(resultArr);
          } else {
            observer.next([this._decodedAccessToken.resource_access.amw.roles.replace('ROLE_', '')]);
          }
        } else {
          observer.next([]);
        }
      });
    }
    return of([]);
  }

  public getIdentityClaims(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public logout() {
    this.oauthService.logOut();
    this.useraliasSubject.next('');
    this.usernameSubject.next('');
    this.router.navigate(['/login']);
  }

  public login(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.oauthService.initLoginFlow();
      this.oauthService.events.subscribe((event) => {
        if (event.type === 'token_received') {
          this._accessToken = this.oauthService.getAccessToken();
          this.accessTokenSubject.next(this._accessToken);
          this._decodedAccessToken = this.jwtHelper.decodeToken(this._accessToken);
          this.usernameSubject.next(this._decodedAccessToken?.given_name + ' ' + this._decodedAccessToken?.family_name);
          this.useraliasSubject.next(this.getIdentityClaims()['preferred_username']);
          resolve();
        } else if (event instanceof OAuthErrorEvent) {
          reject(event);
        }
      });
    });
  }

  private handleEvents(event: any) {
    if (event instanceof OAuthErrorEvent) {
      // handle error
    } else {
      this._accessToken = this.oauthService.getAccessToken();
      this.accessTokenSubject.next(this._accessToken);
      this._decodedAccessToken = this.jwtHelper.decodeToken(this._accessToken);

      if (this._decodedAccessToken?.family_name && this._decodedAccessToken?.given_name) {
        const username = this._decodedAccessToken?.given_name + ' ' + this._decodedAccessToken?.family_name;
        this.usernameSubject.next(username);
      }

      const claims = this.getIdentityClaims();
      if (claims !== null && claims['preferred_username']) {
        this.useraliasSubject.next(claims['preferred_username']);
      }
    }
  }
}
