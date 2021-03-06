import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }


  getAll() {
    //return this.db.list('categories').snapshotChanges();
    return this.db.list('categories').valueChanges();
  }

  getAllCategories() {
    return this.db.list('categories').snapshotChanges();
  }
}
