import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Competency } from './competency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  constructor(private http: HttpClient, private router:Router) { }

  getCompetencies(): Observable<Competency[]>{
    return this.http.get<Competency[]>('http://localhost:3000/api/competency');
  }

  createCompetencies(name:string) {
    this.http.post<{ message: string; id: string }>('http://localhost:3000/api/competency', {name:name}).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
