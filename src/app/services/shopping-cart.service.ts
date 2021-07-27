import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/take';
import { ShoppingCart } from '../models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  productId: string;
  cart: any;

  constructor(private db: AngularFireDatabase) { }

  private create() {
    let result = this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
    console.log(result);
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
      return result.key;
    }

    return cartId;
  }

  async updateItemQuantity(product:any, change: number){
    let cartId = await this.getOrCreateCartId();
    this.productId = product.key;
    this.cart = {items:[], shoppingCartItemCount: 0};
    console.log(this.cart);

    let cart = localStorage.getItem(cartId || "");
    this.cart = cart;

    if (cart) {
      let cartObject = JSON.parse(cart);
      let index=0;
      if (cartObject.items) {

        cartObject.items.forEach((item: any) => {

          if (item.productId == this.productId) {
            cartObject.items[index].quantity += change;
            cartObject.shoppingCartItemCount += change;

            localStorage.setItem(cartId || "", JSON.stringify(cartObject));
            return
          }

          else if (index == (cartObject.items.length - 1)) {
            let shoppItem =
            {
            "productId":[this.productId],
            "quantity": 1
            }
            cartObject.shoppingCartItemCount += 1;

            cartObject.items.push(shoppItem);
            console.log("no estaba el producto")
            localStorage.setItem(cartId || "", JSON.stringify(cartObject));
          }
          index += 1;
        });
      }
    }

    else {
      console.log("creo el primer item en session storage")
      let cartObject = {items:[{}], shoppingCartItemCount: 1};
      let items = [];
      let item =
        {
          ["productId"]:[this.productId],
          "quantity": 1
        }
      cartObject.items.push(item);

      localStorage.setItem(cartId || "", JSON.stringify(cartObject));
      cart = localStorage.getItem(cartId || "");
    }
  }


}
