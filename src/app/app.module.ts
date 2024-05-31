import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';

import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { NoAccessComponent } from './pages/no-access/no-access.component';
import { AppLoginComponent } from './components/app-login/app-login.component';

import { environment } from '../environments/environment';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { AppAuthGuard } from './guard/app.auth.guard';
import { AppAuthService } from './service/app.auth.service';
import { IsInRolesDirective } from './directives/is-in-roles.dir';
import { HomeUsersComponent } from './pages/home-users/home-users.component';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { MatTabsModule } from '@angular/material/tabs';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'amw',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeUsersComponent,
    NoAccessComponent,
    AppLoginComponent,
    IsInRolesDirective,
    ProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule
  ],
  providers: [
    {
      provide: AuthConfig,
      useValue: authConfig
    },
    {
      provide: OAuthStorage,
      useFactory: storageFactory
    },
    AppAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally()
  }
}