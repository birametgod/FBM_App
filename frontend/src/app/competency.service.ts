import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  constructor(private http: HttpClient) { }

  getCompetencies(){
    return this.http.get('http://localhost:3000/api/competency');
  }
}
