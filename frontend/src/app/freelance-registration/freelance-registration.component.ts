import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CityService } from '../city.service';
import { CompetencyService } from '../competency.service';

@Component({
  selector: 'app-freelance-registration',
  templateUrl: './freelance-registration.component.html',
  styleUrls: ['./freelance-registration.component.css']
})
export class FreelanceRegistrationComponent implements OnInit {
  cities;
  competencies;
  registrationForm;

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
      location: '',
      password: '',
      confirmationPassword: ''
    });
  }

  ngOnInit() {
    this.cities = this.cityService.getCities();
    this.competencies = this.competencyService.getCompetencies();
  }

  onSubmit(freeelanceData) {

    console.warn('Your order has been submitted', freeelanceData);
  }

}
