import { Component } from '@angular/core';
import { UserService } from './user.service';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.autoUserAuth();
  }
}
