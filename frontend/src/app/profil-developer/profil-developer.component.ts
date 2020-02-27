import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CityService } from '../city.service';
import { CompetencyService } from '../competency.service';
import { City } from '../city';
import { Observable } from 'rxjs';
import { Competency } from '../competency';
import { mimeType } from './mime-type.validator';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profil-developer',
  templateUrl: './profil-developer.component.html',
  styleUrls: ['./profil-developer.component.css']
})
export class ProfilDeveloperComponent implements OnInit {
  @Input() role : string;
  cities: Observable<City[]>;
  competencies:  Observable<Competency[]>;
  registrationForm: FormGroup;
  citySelected: String;
  competenciesSelected: String;
  imagePreview: any;
  user;
  mode:string; 

  constructor(
    private cityService: CityService,
    private competencyService: CompetencyService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: ActivatedRoute) {
    this.registrationForm = this.formBuilder.group({
      firstname: null,
      lastname: null,
      email: [null, { validators: [Validators.required, Validators.email] }],
      phoneNumber:[null, { validators: [Validators.pattern("^(6|7)?[0-9]{8}$")] }],
      image:['', { validators: [Validators.required]},[mimeType]],
      location: null,
      competencies: [],
      password: [null, { validators: [Validators.required, Validators.minLength(6)] }],
      confirmationPassword: [null, { validators: [Validators.required, Validators.minLength(6)] }]
    });
  }

  ngOnInit() {
    this.cities = this.cityService.getCities();
    this.competencies = this.competencyService.getCompetencies();
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        const userId = paramMap.get('userId');
        this.userService.getUserId(userId).subscribe(user => {
          this.user = user;
          this.role = user.role;
          if (this.role == 'User' || this.role == 'Admin') {
            this.registrationForm.get('password').clearValidators();
            this.registrationForm.get('password').updateValueAndValidity();
            this.registrationForm.get('confirmationPassword').clearValidators();
            this.registrationForm.get('confirmationPassword').updateValueAndValidity();
          } else {
            this.registrationForm.get('password').clearValidators();
            this.registrationForm.get('password').updateValueAndValidity();
            this.registrationForm.get('confirmationPassword').clearValidators();
            this.registrationForm.get('confirmationPassword').updateValueAndValidity();
            this.registrationForm.get('location').setValidators([Validators.required]);
            this.registrationForm.get('location').updateValueAndValidity();
            this.registrationForm.get('competencies').setValidators([Validators.required]);
            this.registrationForm.get('competencies').updateValueAndValidity(); 
          }
          console.log(user);
          this.registrationForm.setValue({
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            phoneNumber:this.user.phoneNumber,
            image: this.user.imagePath ? this.user.imagePath :  '',
            location: this.user.location? this.user.location._id : null,
            competencies: this.user.competencies,
            password: '',
            confirmationPassword: ''
          });
          console.log(this.registrationForm);
        }); 
      } else {
        this.mode = 'created';
        this.user = null;
      }
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registrationForm.patchValue({ image: file });
    this.registrationForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    console.log(this.registrationForm);
    reader.readAsDataURL(file);
  }

  onSaveUser() {
    if (this.registrationForm.invalid) {
      return;
    }
    if (this.mode == 'edit') {
      // update user
      this.userService.updateUser(
        this.user.id,
        this.registrationForm.value.email,
        this.registrationForm.value.location,
        this.registrationForm.value.competencies,
        `+33${this.registrationForm.value.phoneNumber}`,
        this.registrationForm.value.firstname,
        this.registrationForm.value.lastname,
        this.registrationForm.value.image
        )
    } else {
      if (this.role == 'User') {
        const user: User = {
          email: this.registrationForm.value.email,
          password: this.registrationForm.value.password,
          cityId: null,
          competenciesId: null,
          role: this.role,
          phoneNumber: `+33${this.registrationForm.value.phoneNumber}`,
          firstname: null,
          lastname: this.registrationForm.value.lastname,
          image: this.registrationForm.value.image
        }
        this.userService.addUser(user);
      } else if (this.role == 'Freelance'){
        const user: User = {
          email: this.registrationForm.value.email,
          password: this.registrationForm.value.password,
          cityId: this.registrationForm.value.location,
          competenciesId: this.registrationForm.value.competencies,
          role: this.role,
          phoneNumber: `+33${this.registrationForm.value.phoneNumber}`,
          firstname: this.registrationForm.value.firstname,
          lastname: this.registrationForm.value.lastname,
          image: this.registrationForm.value.image
        }
        this.userService.addUser(user);
      }
    }
    this.registrationForm.reset();
  }

  changePicture() : void {
    document.getElementById("pictureDeveloper").click();
  }
  
}
