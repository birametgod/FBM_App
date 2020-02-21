import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CityService } from '../city.service';
import { CompetencyService } from '../competency.service';

@Component({
  selector: 'app-profil-developer',
  templateUrl: './profil-developer.component.html',
  styleUrls: ['./profil-developer.component.css']
})
export class ProfilDeveloperComponent implements OnInit {
  cities;
  competencies;
  registrationForm;
  citySelected: String;
  competenciesSelected: String;

  constructor(
    private cityService: CityService,
    private competencyService: CompetencyService,
    private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      firstname: new FormControl(null, { validators: [Validators.required] }),
      lastname: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      phoneNumber:new FormControl(null, { validators: [Validators.required, Validators.pattern("^(6|7)?[0-9]{8}$")] }),
      picture: '',
      location: null,
      competencies: [],
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)] }),
      confirmationPassword: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)] })
    });
  }

  ngOnInit() {
    this.cities = this.cityService.getCities();
    this.competencies = this.competencyService.getCompetencies();
  }

  onSubmit(freelanceData) {
    if (this.registrationForm.invalid) {
      return;
    }
    if(freelanceData.password == freelanceData.confirmationPassword)
    {
      var formData: any = new FormData();
      formData.append("firstname", freelanceData.firstname);
      formData.append("lastname", freelanceData.lastname);
      formData.append("email", freelanceData.email);
      formData.append("phoneNumber", freelanceData.phoneNumber);
      formData.append("location", this.citySelected);
      formData.append("competencies", this.competenciesSelected);
      formData.append("picture", document.getElementById("pictureDeveloper").value);
    }
    else{
      alert("Les mot de passe ne correspondent pas");
    }
  }

  changePicture() : void{
    document.getElementById("pictureDeveloper").click();
  }

  readURL() {
    var input = document.getElementById("pictureDeveloper");
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        document.getElementsByClassName("example-header-image")[0].style.backgroundImage = "url('" + e.target.result + "')";
      }
      
      reader.readAsDataURL(input.files[0]);
    }
  }
  
}
