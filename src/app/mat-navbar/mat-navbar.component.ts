import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import firebase from 'firebase/app';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent {


  constructor(public authService: AuthService, private router: Router) {

   }

  logout() {
    this.authService.logout()
  }

}
