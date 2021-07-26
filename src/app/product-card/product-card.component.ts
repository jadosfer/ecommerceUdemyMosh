
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: any;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart: any;


  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let cart = this.cartService.getCart();
    let result = 0;
    if (cart) {
      cart.forEach((item: any) => {
        if (item.productId == this.product.key) {
          console.log("entra: ", item.quantity);
          result = item.quantity;
        }
      });
    }

    return result;
  }

}
