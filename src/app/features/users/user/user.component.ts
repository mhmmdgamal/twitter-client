import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user!: User;
  isFollowing: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.usersService.getByUsername(param.username)
        .subscribe(({ data }: any) => {
          this.user = data.user;
          this.isFollowingUser();
        });
    });
  }

  private isFollowingUser() {
    return this.usersService.isFollowing(this.user.id, this.currentUser()?.id)
      .subscribe(({ data }: any) => this.isFollowing = data.isFollowing);
  }

  doFollow() {
    this.usersService.follow(this.user.id, this.currentUser()?.id)
      .subscribe(({ data }: any) => {
        this.isFollowing = true;
        this.user = { ...this.user, followersCount: this.user.followersCount + 1 };
      });
  }

  doUnfollow() {
    this.usersService.unfollow(this.user.id, this.currentUser()?.id)
      .subscribe(() => {
        this.isFollowing = false;
        this.user = { ...this.user, followersCount: this.user.followersCount - 1 };
      });

  }

  private currentUser() {
    return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }

  me() {
    return this.currentUser()?.id === this.user?.id;
  }
}
