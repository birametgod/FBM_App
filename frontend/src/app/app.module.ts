import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from "@angular/material/slider";
import { AppComponent } from './app.component';
import { SearchProfilComponent } from './search-profil/search-profil.component';
import { ProfilDeveloperComponent } from './profil-developer/profil-developer.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FreelanceRegistrationComponent } from './freelance-registration/freelance-registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
