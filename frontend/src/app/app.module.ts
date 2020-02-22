import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchProfilComponent } from './search-profil/search-profil.component';
import { ProfilDeveloperComponent } from './profil-developer/profil-developer.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FreelanceRegistrationComponent } from './freelance-registration/freelance-registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmailInputComponent } from './email-input/email-input.component';
import { MatInputModule } from '@angular/material/input';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchProfilComponent },
  { path: 'profil', component: ProfilDeveloperComponent, canActivate: [AuthGuard] },
  { path: 'registration', component: FreelanceRegistrationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SearchProfilComponent,
    ProfilDeveloperComponent,
    AuthentificationComponent,
    FreelanceRegistrationComponent,
    CompanyRegistrationComponent,
    EmailInputComponent,
    SearchbarComponent,
    EmailInputComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MDBBootstrapModule.forRoot(),
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor ,multi:true},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
