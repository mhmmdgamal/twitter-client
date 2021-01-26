import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };
  returnUrl!: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authservice: AuthService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(["/"]);
      return;
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authservice.login(this.user).subscribe(({ data }: any) => {
      localStorage.setItem("currentUser", JSON.stringify({ ...data.login }));
      this.router.navigate([this.returnUrl]);
    }, (error) => {
      console.log(error);
    });
  }

}
