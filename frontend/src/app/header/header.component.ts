import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticate = false;
  tst = new FormControl();
  isActive = true;
  isRole : string;
  userId: string;


  private authSubs: Subscription;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.isAuthenticate = this.userService.getIsAuth();
    this.userId = this.userService.getIdUser();
    this.isRole = this.userService.getRole();
    this.authSubs = this.userService.getUserAuthenticateListener().subscribe(isAuthenticate => {
      this.isAuthenticate = isAuthenticate;
    });
    this.userService.getIsRoleListener().subscribe(isRole => {
      this.isRole = isRole;
    });
    this.userService.getIdUserListener().subscribe(idUser => {
      this.userId = idUser;
      console.log(this.userId);
    });

  }

  isAdmin() {
    return this.isRole && this.isRole == 'Admin';
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

}
