import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;
  private subs: Subscription;
  constructor(private userService: UserService, private flashMessage: FlashMessagesService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)] })
    });
    this.subs = this.userService.getUserAuthenticateListener().subscribe(value => {
      this.isLoading = value;
    });
  }

  onLogin() {
    if (this.form.invalid) {
      this.showFlashError();
      return;
    }
    this.isLoading = true;
    const response = this.userService.userLogin(this.form.value.email, this.form.value.password);
    if (typeof response === 'undefined') {
      this.showFlashError();
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  showFlashError() {
    this.flashMessage.show('Indentifiants invalides !', { cssClass: 'alert-danger', timeout: 5000 });
  }
}
