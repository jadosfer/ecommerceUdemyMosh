import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AppUser } from '../models/app-user';


@Injectable()
export class AuthService {

  user$: Observable<firebase.User | null>;

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
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
    });
  }

  logout() {
    this.afAuth.signOut()
    this.router.navigateByUrl('/');
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
    .switchMap(user => {
      if (user) return this.userService.get(user.uid);

      return Observable.of(null);
    })
  }

}
