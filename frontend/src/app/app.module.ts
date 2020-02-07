import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from "@angular/material/slider";
import { AppComponent } from './app.component';

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
