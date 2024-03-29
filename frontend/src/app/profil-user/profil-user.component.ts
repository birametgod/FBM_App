import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';
import { UserTag } from '../user-tag';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {

  isLoading = false;
  user;
  pathByProfile = false;

  constructor(private router: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.isLoading = true;
      if (paramMap.has('userId')) {
        if (paramMap.has('path')) {
          this.pathByProfile = true;
        }
        const userId = paramMap.get('userId');
        this.userService.getUserId(userId).subscribe(user => {
          this.isLoading = false;
          this.user = user;
        });
      }
    });
  }

}
