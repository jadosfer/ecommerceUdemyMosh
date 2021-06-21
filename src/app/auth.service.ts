import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { MatNavbarComponent } from './mat-navbar/mat-navbar.component';
import { AppUser } from './models/app-user';


@Injectable()
export class AuthService {

  user$: Observable<firebase.User | null>;

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
      this.user$ = afAuth.authState;
  }


  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=> {
      let returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        this.router.navigateByUrl(returnUrl);
      }
    }

    );
  }

  logout() {
    this.afAuth.signOut()
    this.router.navigateByUrl('/');
  }

}
