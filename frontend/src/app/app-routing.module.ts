import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SearchProfilComponent } from './search-profil/search-profil.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { FreelanceRegistrationComponent } from './freelance-registration/freelance-registration.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchProfilComponent },
  { path: 'profil/:userId', component: ProfilUserComponent, canActivate: [AuthGuard] },
  { path: 'registration', component: FreelanceRegistrationComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard],data: {roles: ['Admin']} },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
