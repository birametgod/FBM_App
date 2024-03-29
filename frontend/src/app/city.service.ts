import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCities() : Observable<City[]>{
    return this.http.get<City[]>('http://localhost:3000/api/city');
  }

  createCity(name:string) {
    this.http.post<{ message: string; id: string }>('http://localhost:3000/api/city', {name:name}).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
