import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

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
