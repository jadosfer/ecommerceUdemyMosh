import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth ) {
  }


  googleAuth() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  // authLogin(provider: firebase.auth.AuthProvider) {
  //   return this.afAuth.signInWithPopup(provider)
  //   .then((result) => {
  //       console.log('You have been successfully logged in!')
  //   }).catch((error) => {
  //       console.log(error)
  //   })
  // }

}
