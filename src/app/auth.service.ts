import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { MatNavbarComponent } from './mat-navbar/mat-navbar.component';
import { AppUser } from './models/app-user';


@Injectable()
export class AuthService {

  user$: Observable<firebase.User | null>;

  constructor(public afAuth: AngularFireAuth) {
      this.user$ = afAuth.authState;
  }


  login() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut()
  }

}
