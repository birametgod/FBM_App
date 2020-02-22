import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserTag } from '../user-tag';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-profil',
  templateUrl: './search-profil.component.html',
  styleUrls: ['./search-profil.component.css']
})
export class SearchProfilComponent implements OnInit, OnDestroy {

  users: UserTag[] = [];
  private usersSub: Subscription;
  isLoading = false;

  constructor(private userService: UserService, private activatedroute: ActivatedRoute) {
      this.activatedroute.queryParams.subscribe(data => {
            this.userService.getUserByTag(data.competencieId,data.locationId);
        })
    }

  ngOnInit() {
    this.isLoading = true;
    this.usersSub = this.userService.getUserTagUpdated().subscribe(usersTag => {
      this.users = usersTag;
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
