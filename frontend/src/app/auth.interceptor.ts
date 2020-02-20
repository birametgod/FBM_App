import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}
  // add token to every request
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.userService.getToken();
    const authToken = request.clone({
      headers: request.headers.set('Authorization',`Bearer ${token} `)
    });
    return next.handle(authToken);
  }
}
