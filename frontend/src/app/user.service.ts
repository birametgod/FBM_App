import { Injectable } from '@angular/core';
import { User } from './user';
import { Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private route: Route) { }

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password
    };
    this.http.post<{ message: string; result: User }>(BACKEND_URL + '/signup', user).subscribe(
      res => {
        this.route.navigate(['/']);
      },
      error => {
        this.userAuthenticate.next(false);
      }
    );
  }
}
