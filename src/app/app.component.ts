import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  itemValue = '';
  items: Observable<any>;

  constructor(private auth: AuthService, private userService: UserService, public db: AngularFireDatabase) {

    auth.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
      }
    });
  }

}
