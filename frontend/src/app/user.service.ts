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
  isRole: string;
  isAuthenticate = false;
  private userAuthenticate = new Subject<boolean>();
  private myTimer: any;
  private userTagUpdated = new Subject<UserTag[]>();
  private userRoleUpdated = new Subject<string>();
  private userIdUpdated = new Subject<string>();



  constructor(private http: HttpClient, private route: Router) { }

  getToken(): string {
    return this.token;
  }

  getRole(): string {
    return this.isRole;
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

  getIsRoleListener(): Observable<string> {
    return this.userRoleUpdated.asObservable();
  }

  getIdUserListener(): Observable<string> {
    return this.userIdUpdated.asObservable();
  }

  getUserByTag(competencyId: string, locationId: string) {
    const queryParamsRoute = `?locationId=${locationId}&competenciesId=${competencyId}`;
    return this.http.get<UserTag[]>('http://localhost:3000/api/user/userTag' + queryParamsRoute).subscribe((values) => {
      this.userTagUpdated.next(values);
    }, error => {
      console.log(error);
    })
  }

  getUserTagUpdated() {
    return this.userTagUpdated.asObservable();
  }

  updateUser(
    id: string,
    email: string,
    cityId: string,
    competenciesId: [],
    phoneNumber: string,
    firstname: string,
    lastname: string,
    image: File | string) {
      let user: any | FormData;
      if (typeof image === 'object') {
        user = new FormData();
        user.append('email', email );
        user.append('image', image);
        user.append('cityId', cityId? cityId : '');
        user.append('competenciesId',competenciesId? JSON.stringify(competenciesId) : '');
        user.append('phoneNumber', phoneNumber? phoneNumber : '');
        user.append('firstname', firstname? firstname : '');
        user.append('lastname', lastname? lastname : '');
      } else {
        user = {
          email: email,
          cityId: cityId,
          competenciesId: competenciesId,
          phoneNumber: phoneNumber,
          firstname: firstname,
          lastname: lastname,
          imagePath: image
        }
      }
    console.log(user);
    this.http.put<any>(`http://localhost:3000/api/user/${id}`, user).subscribe(result => {
    console.log(result);
    this.route.navigate(['/']);
    });
  }


  addUser(user: User) {
    const userData = new FormData();
    userData.append('email', user.email );
    userData.append('password', user.password);
    userData.append('image', user.image);
    userData.append('cityId', user.cityId ? user.cityId : '');
    userData.append('competenciesId',user.competenciesId? JSON.stringify(user.competenciesId) : '');
    userData.append('role', user.role);
    userData.append('phoneNumber', user.phoneNumber? user.phoneNumber : '');
    userData.append('firstname', user.firstname? user.firstname : '');
    userData.append('lastname', user.lastname? user.lastname : '');
    this.http.post<{ message: string; result: User }>('http://localhost:3000/api/user/signUp', userData).subscribe(
      res => {
        console.log(res);
      },
      error => {
        this.userAuthenticate.next(false);
      }
    );
  }

  getUserId(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/user/${id}`);
  }

  userLogin(email: string, password: string) {
    const user = {
      email: email,
      password: password
    };
    this.http
      .post<{ message: string; user: any; token: string; expiresIn: number }>('http://localhost:3000/api/user/login', user)
      .subscribe(
        res => {
          this.token = res.token;
          if (res.token) {
            this.setTimer(res.expiresIn);
          }
          this.idUser = res.user.id;
          this.isRole = res.user.role;
          this.userRoleUpdated.next(this.isRole);
          const now = new Date();
          const expireDate = new Date(now.getTime() + res.expiresIn * 1000);
          this.saveAuthData(res.token, expireDate);
          this.isAuthenticate = true;
          this.userAuthenticate.next(true);
          this.userIdUpdated.next(this.idUser);
          if (this.isRole === 'Admin') {
            this.route.navigate(['/admin']);
          } else {
            this.route.navigate(['/']);
          }
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
    localStorage.setItem('role', this.isRole);
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
      this.isRole = authData.role;
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
    this.isRole = null;
    this.isAuthenticate = false;
    this.userAuthenticate.next(false);
    this.userRoleUpdated.next('');
    this.userIdUpdated.next('');
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
    const role = localStorage.getItem('role')
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      role: role
    };
  }

}
