import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchProfilComponent } from './search-profil/search-profil.component';
import { ProfilDeveloperComponent } from './profil-developer/profil-developer.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FreelanceRegistrationComponent } from './freelance-registration/freelance-registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchProfilComponent,
    ProfilDeveloperComponent,
    AuthentificationComponent,
    FreelanceRegistrationComponent,
    CompanyRegistrationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
