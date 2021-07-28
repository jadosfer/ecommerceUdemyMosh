import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/take';
import { ShoppingCart } from '../models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cart: any;

  constructor(private db: AngularFireDatabase) { }

  private create() {
    let result = this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
    return result;
  }

  public getCart() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      let cart = localStorage.getItem(cartId);
      if (cart) {
        return JSON.parse(cart);

      }
    }
    return null;
  }

  private async getOrCreateCartId() {

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    if (result.key) {
      localStorage.setItem('cartId', result.key);
      localStorage.setItem(result.key, JSON.stringify({items:[], shoppingCartItemCount: 0}));
      return result.key;
    }
    return cartId;
  }

  getCartFromLS(cartId: string) {
    return JSON.parse(localStorage.getItem(cartId) || "");
  }

  async updateItemQuantity(product:any, change: number){
    let cartId = await this.getOrCreateCartId();

    if(!cartId) return
    let cartObject = this.getCartFromLS(cartId);

    if (cartObject.items.length != 0) {

      for (let i=0;i<cartObject.items.length;i++) {
        if (cartObject.items[i].productId == product.key) {
          cartObject.items[i].quantity += change;
          if (cartObject.items[i].quantity == 0) cartObject.items.splice(i, 1) //borra item
          cartObject.shoppingCartItemCount += change;
        }

        //"no estaba el producto => creo nuevo item"
        else if (i == (cartObject.items.length - 1)) {
          let shoppItem =
          {
            "productId":[product.key],
            "quantity": 1
          }
          cartObject.shoppingCartItemCount += 1;
          cartObject.items.push(shoppItem);
          break;
        }
      }
    }

    //"creo el primer item en session storage"
    else {
      let item =
        {
          ["productId"]:[product.key],
          "quantity": 1
        }
      cartObject.items[0] = item;
      cartObject.shoppingCartItemCount = 1;
    }

    localStorage.setItem(cartId, JSON.stringify(cartObject));
  }
}
