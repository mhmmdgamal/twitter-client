import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = { email: '', password: '', firstName: '', lastName: '', username: '' };

  constructor(private readonly authservice: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(["/"]);
      return;
    }
  }

  register() {
    this.authservice.register(this.user).subscribe(({ data }: any) => {
      localStorage.setItem("currentUser", JSON.stringify({ ...data.register }));
      this.router.navigate(["/"]);
    }, (error) => {
      console.log(error);
    });
  }
}
