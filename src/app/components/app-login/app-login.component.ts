import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.scss'
})
export class AppLoginComponent implements OnInit {

  username = ''
  useralias = ''

  constructor(
    private authService : AppAuthService
  ) {}

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe(name => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe(alias => {
      this.useralias = alias;
    });
  }

  public login () {
    this.authService.login()
  }

  public logout () {
    this.authService.logout()
  }

  public isAuthenticated () : boolean {
    return this.authService.isAuthenticated()
  }

}
