import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent {

  appUser: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser)
  }

  logout() {
    this.auth.logout()
  }

}
