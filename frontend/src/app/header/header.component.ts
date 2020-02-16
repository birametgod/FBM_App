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


  private authSubs: Subscription;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.isAuthenticate = this.userService.getIsAuth();
    this.authSubs = this.userService.getUserAuthenticateListener().subscribe(authValue => {
      this.isAuthenticate = authValue;
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

}
