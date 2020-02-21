import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { City } from '../city';
import { Competency } from '../competency';
import { CityService } from '../city.service';
import { CompetencyService } from '../competency.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchForm: FormGroup;
  citiesControl = new FormControl('',{validators: [Validators.required]});
  technosControl = new FormControl('',{validators: [Validators.required]});
  cities: City[] = [];
  competencies: Competency[];
  citiesFilteredOptions: City[];
  technosFilteredOptions: Competency[];

  constructor(private cityService: CityService, private competencyService: CompetencyService, private userService: UserService ) {}


  ngOnInit() {
    this.cityService.getCities().subscribe( (city:City[]) => {
      this.cities = city;
    });

    this.competencyService.getCompetencies().subscribe((competency:Competency[]) => {
      this.competencies = competency;
    });
    this.searchForm = new FormGroup({
      city: this.citiesControl,
      techno: this.technosControl
    });
    this.citiesControl.valueChanges.subscribe(value => this.citiesFilteredOptions = this.citiesFilter(value));
    this.technosControl.valueChanges.subscribe(value => this.technosFilteredOptions = this.technosFilter(value));
  }

   citiesFilter(value:string): City[] {
    console.log(value);
    //const value = value.toLowerCase();
    return this.cities.filter(cityOption => cityOption.name.toLowerCase().indexOf(value) === 0);
  }

  displayCityName(city: City): string {
    return city && city.name ? city.name : '';
  }
  
  displayCompetencyName(competency: Competency): string {
    console.log(competency);
    return competency && competency.name ? competency.name : '';
  }

  technosFilter(value:string): Competency[] {
    //const filterValue = value.toLowerCase();
    console.log(value);
    return this.competencies.filter(competencyOption => competencyOption.name.toLowerCase().indexOf(value) === 0);
  }

  onSubmit(form: FormGroup) {
    if (this.searchForm.invalid) {
      return;
    }
    const idTech = form.value.techno.id;
    const idCity = form.value.city.id;
    if (!idTech || !idCity) {
      return;
    }
    this.userService.getUserByTag(idTech,idCity)
  }
}
