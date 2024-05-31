import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../service/app.auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.scss'
})
export class AppLoginComponent implements OnInit {

  username = ''
  useralias = ''

  constructor(
    private authService: AppAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe(name => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe(alias => {
      this.useralias = alias;
    });
  }

  public login() {
    this.authService.login().then(() => {
      this.router.navigate(['/home']);
    });
  }

  public logout() {
    this.authService.logout();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
