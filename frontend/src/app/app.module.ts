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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmailInputComponent } from './email-input/email-input.component';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: AuthentificationComponent },
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
    EmailInputComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
