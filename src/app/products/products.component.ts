import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$:any;
  category: string | null;
  products:any[];
  filteredProducts:any[];
  subscription: Subscription;
  cart: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public shoppingCartService: ShoppingCartService

  ) {
    this.cart = this.shoppingCartService.getCart();
    this.filteredProducts = [];

    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        if (this.products) {
          this.filteredProducts = (this.category) ?
          this.products.filter(p =>
            p.payload.val().category == this.category) :
          this.products;
        }
      });
    });

   }

  ngOnInit() {
    //this.cart = (await this.shoppingCartService.getCart()).valueChanges();
    //this.cart = this.shoppingCartService.getCart();
    console.log("OnInit")
  }
}
