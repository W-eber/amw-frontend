import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { HomeUsersComponent } from './pages/home-users/home-users.component';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppAuthGuard } from './guard/app.auth.guard';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { AppRoles } from './app.roles';

const routes: Routes = [
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
    path: 'login',
    component: AppLoginComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileInfoComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Read, AppRoles.Update]
    }
  },
  {
    path: 'edit/:profileId', 
    component: EditUserComponent, 
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Admin]
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
