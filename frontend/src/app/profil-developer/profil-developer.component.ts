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
      image:['', { validators: [Validators.required]}, [mimeType]],
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
          //this.isLoading = false;
          console.log(user);
          this.user = user;
          this.role = user.role;
          this.registrationForm.setValue({
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            phoneNumber:this.user.phoneNumber,
            image: '',
            location: this.user.location,
            competencies: this.user.competencies,
            password: '',
            confirmationPassword: ''
          });
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
    reader.readAsDataURL(file);
  }

  onSaveUser() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.registrationForm.reset();
    if (this.mode == 'edit') {
      // update user
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
          lastname: this.registrationForm.value.lastname
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
          lastname: this.registrationForm.value.lastname
        }
        this.userService.addUser(user);
      }
    }
  }

  changePicture() : void {
    document.getElementById("pictureDeveloper").click();
  }
  
}
