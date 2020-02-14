import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchForm: FormGroup;
  citiesControl = new FormControl();
  technosControl = new FormControl();
  citiesOptions: string[] = ['Lyon', 'Paris', 'Marseille'];
  technosOptions: string[] = ['Java', 'Node JS', 'PHP'];
  citiesFilteredOptions: Observable<string[]>;
  technosFilteredOptions: Observable<string[]>;

  ngOnInit() {
    this.searchForm = new FormGroup({
      city: this.citiesControl,
      techno: this.technosControl
    });
    this.citiesFilteredOptions = this.citiesControl.valueChanges.pipe(
      startWith(''),
      map(value => this._citiesFilter(value))
    );
    this.technosFilteredOptions = this.technosControl.valueChanges.pipe(
      startWith(''),
      map(value => this._technosFilter(value))
    );
  }

  private _citiesFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.citiesOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _technosFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.technosOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Techno', form.value.techno);
    console.log('City', form.value.city);
  }
}
