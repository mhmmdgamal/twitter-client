import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInfo } from "src/app/shared/models/AuthInfo";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  authInfo!: AuthInfo;

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      this.authInfo = JSON.parse(currentUser);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}

