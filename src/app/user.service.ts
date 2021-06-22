import { AngularFireDatabase, AngularFireObject  } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
   this.db.object('/users/' + user.uid).update({
     name: user.displayName,
     email: user.email
   });
  }


}
