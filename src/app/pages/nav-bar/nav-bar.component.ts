import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  username: string = '';

  constructor(private router: Router, private authService: AppAuthService) {
    this.authService.usernameObservable.subscribe(name => {
      this.username = name;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}