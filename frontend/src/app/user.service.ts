import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserTag } from './user-tag';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;
  idUser: string;
  isAuthenticate = false;
  private userAuthenticate = new Subject<boolean>();
  private myTimer: any;
  private userTagUpdated = new Subject<UserTag[]>();

  
  constructor(private http: HttpClient, private route: Router) { }

  getToken(): string {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticate;
  }

  getIdUser(): string {
    return this.idUser;
  }

  getUserAuthenticateListener(): Observable<any> {
    return this.userAuthenticate.asObservable();
  }

  getUserByTag(competencyId: string, locationId: string)  {
    const queryParamsRoute = `?locationId=${locationId}&competenciesId=${competencyId}`;
    return this.http.get<UserTag[]>('http://localhost:3000/api/user/userTag'+ queryParamsRoute).subscribe((values) => {
      this.userTagUpdated.next(values);
    },error => {
      console.log(error);
    })
  }

  getUserTagUpdated() {
    return this.userTagUpdated.asObservable();
  }
  

  addUser(user:User) {
    this.http.post<{ message: string; result: User }>('http://localhost:3000/api/user/signUp', user).subscribe(
      res => {
        console.log(res);
        this.route.navigate(['/']);
      },
      error => {
        this.userAuthenticate.next(false);
      }
    );
  }

  userLogin(email: string, password: string) {
    const user = {
      email: email,
      password: password
    };
    this.http
      .post<{ message: string; user: any; token: string; expiresIn: number }>( 'http://localhost:3000/api/user/login', user)
      .subscribe(
        res => {
          console.log(res);
          this.token = res.token;
          if (res.token) {
            this.setTimer(res.expiresIn);
          }
          this.idUser = res.user;
          const now = new Date();
          const expireDate = new Date(now.getTime() + res.expiresIn * 1000);
          this.saveAuthData(res.token, expireDate);
          this.isAuthenticate = true;
          this.userAuthenticate.next(true);
          this.route.navigate(['/']);
        },
        error => {
          this.userAuthenticate.next(false);
        }
      );
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', this.idUser);
  }

  autoUserAuth() {
    const authData = this.getAuhtData();
    const now = new Date();
    if (!authData) {
      return;
    }
    const expiresIn = authData.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.setTimer(expiresIn / 1000);
      this.token = authData.token;
      this.idUser = authData.userId;
      this.isAuthenticate = true;
      this.userAuthenticate.next(true);
    }
  }

  private setTimer(duration: number) {
    this.myTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.idUser = null;
    this.isAuthenticate = false;
    this.userAuthenticate.next(false);
    clearTimeout(this.myTimer);
    this.clearAuthData();
    this.route.navigate(['/']);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private getAuhtData() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }


}
