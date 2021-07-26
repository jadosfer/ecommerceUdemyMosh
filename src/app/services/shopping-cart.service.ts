import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/take';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Product } from '../models/product';

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
    // let cartId = await this.getOrCreateCartId();
    // return this.db.object('shopping-carts/' + cartId)
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



  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: any) {
    let cartId = await this.getOrCreateCartId();
    this.productId = product.key;
    this.cart = null;

    let cart = localStorage.getItem(cartId || "");
    this.cart = cart;

    if (cart) {
      let cartObject = JSON.parse(cart);

      let index=0;
      cartObject.forEach((item: any) => {

        if (item.productId == this.productId) {
          cartObject[index].quantity += 1;
          localStorage.setItem(cartId || "error", JSON.stringify(cartObject));
          return
        }

        else if (index == (cartObject.length - 1)) {
          let shoppItem =
          {
          "productId":[this.productId],
          "quantity": 1
          }
          cartObject.push(shoppItem);
          console.log("no estaba el producto")
        }
        index += 1;
      });

      localStorage.setItem(cartId || "", JSON.stringify(cartObject));
    }

    else {
      console.log("creo el primer item en session storage")
      let cartObject = [];
      let item =
        {
          ["productId"]:[this.productId],
          "quantity": 0
        }
      cartObject.push(item);
      localStorage.setItem(cartId || "", JSON.stringify(cartObject));
      //window.location.reload();
      this.addToCart(product);
      }

  }

  async removeFromCart(product: any) {
    let cartId = await this.getOrCreateCartId();
    this.productId = product.key;

    let cart = localStorage.getItem(cartId || "");
    this.cart = cart;

    if (cart) {
      let cartObject = JSON.parse(cart);

      let index=0;
      cartObject.forEach((item: any) => {

        if (item.productId == this.productId) {
          cartObject[index].quantity -= 1;
          localStorage.setItem(cartId || "", JSON.stringify(cartObject));
          return
        }

        index += 1;
      });
    }
  }

}
