import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { AppAuthGuard } from './guard/app.auth.guard';
import { AppRoles } from './app.roles';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { HomeUsersComponent } from './pages/home-users/home-users.component';

const routes: Routes = [
  {
    path: 'login',
    component: AppLoginComponent,
  },
  {
    path: 'home',
    component: HomeUsersComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Read],
      pagetitle: 'Home'
    }
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileInfoComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Read],
      pagetitle: 'Profil Bearbeiten'
    }
  },
  {
    path: 'profile/:id',
    pathMatch: 'full',
    component: ProfileInfoComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Update],
      pagetitle: 'Profil Bearbeiten'
    }
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: ProfileInfoComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Spiel Bearbeiten/Hinzufügen'
    }
  },
  {
    path: 'noaccess',
    component: NoAccessComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
