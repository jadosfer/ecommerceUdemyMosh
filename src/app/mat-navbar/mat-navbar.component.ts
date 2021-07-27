import { ShoppingCartItem } from './../models/shopping-cart-item';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mat-navbar',
  templateUrl: './mat-navbar.component.html'
})
export class MatNavbarComponent implements OnInit{

  shoppingCartItemCount: number = 0;
  appUser: AppUser;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  logout() {
    this.auth.logout()
  }

  getTotalItems() {
    let cart = this.shoppingCartService.getCart();
    return cart.shoppingCartItemCount;
  }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

}
