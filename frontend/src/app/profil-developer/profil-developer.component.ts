import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CityService } from '../city.service';
import { CompetencyService } from '../competency.service';
import { City } from '../city';
import { Observable } from 'rxjs';
import { Competency } from '../competency';

@Component({
  selector: 'app-profil-developer',
  templateUrl: './profil-developer.component.html',
  styleUrls: ['./profil-developer.component.css']
})
export class ProfilDeveloperComponent implements OnInit {
  cities: Observable<City[]>;
  competencies: Observable<Competency[]>;
  registrationForm: FormGroup;

  constructor(
    private cityService: CityService,
    private competencyService: CompetencyService,
    private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      picture: '',
      location: null,
      password: '',
      confirmationPassword: ''
    });
  }

  ngOnInit() {
    this.cities = this.cityService.getCities();
    this.competencies = this.competencyService.getCompetencies();
  }

  onSubmit(freelanceData) {
    console.warn('Your order has been submitted', freelanceData);
  }

}
