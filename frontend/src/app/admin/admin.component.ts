import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompetencyService } from '../competency.service';
import { CityService } from '../city.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  compentencyForm: FormGroup;
  cityForm: FormGroup;

  constructor(  private formBuilder: FormBuilder,private competencyService: CompetencyService, private cityService: CityService) {

    this.compentencyForm = this.formBuilder.group({
      name: [null, { validators: [Validators.required] }] 
    });

    this.cityForm = this.formBuilder.group({
      name: [null, { validators: [Validators.required] }] 
    });

   }

  ngOnInit() {
  }

  onSaveCompetency() {
    if (this.compentencyForm.invalid) {
      return;
    }
    this.competencyService.createCompetencies(this.compentencyForm.value.name);
    this.compentencyForm.reset();
  }

  onSaveCity() {
    if (this.cityForm.invalid) {
      return;
    }
    this.cityService.createCity(this.cityForm.value.name);
    this.cityForm.reset();
  }


}
