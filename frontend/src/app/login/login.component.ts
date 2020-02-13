import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MuseeService} from '../musee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
    private service: MuseeService,
    private router: Router
  ) {
    if(localStorage.getItem('token'))
      this.router.navigate(['./']);

    this.checkoutForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  ngOnInit() {
  }

  connexion() {
    document.getElementById('error-message').style.display = 'none';
    let email = this.checkoutForm.controls.email.value;
    let password = this.checkoutForm.controls.password.value;
    this.showLoading();

    this.service.connect(email, password).subscribe((data) => {
      if(data['token']) {
        localStorage.setItem('token', data['token']);
        this.hideLoading();
        this.router.navigate(['./']);
      } else {
        this.hideLoading();
        document.getElementById('error-message').style.display = 'block';
      }
    }, (error) => {
      this.hideLoading();
      document.getElementById('error-message').style.display = 'block';
    });
  }

  hideLoading() {
    $('.text-login').show();
    $('#loading').hide();
  }

  showLoading() {
    $('.text-login').hide();
    $('#loading').show();
  }

}
