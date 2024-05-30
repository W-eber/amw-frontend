import { Component } from '@angular/core';
import { AppRoles } from './app.roles';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public pagetitle : string = ''
  public roles = AppRoles;

  constructor(private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof RoutesRecognized) {
        this.pagetitle = ''
        let route = e.state.root.firstChild
        if (route) {
          this.pagetitle = route.data['pagetitle'] || ''
        }
      }
    })
  }

}