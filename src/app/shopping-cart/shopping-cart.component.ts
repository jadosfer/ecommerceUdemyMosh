import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: any;
  titles: string[]=[];
  subscription: Subscription;
  filteredProduct:any[];
  products:any[];

  title: string;
  quantity: number;
  sortedData: any[];


  constructor(private cartService: ShoppingCartService,
    private productService: ProductService,
    private route: ActivatedRoute) {


      this.cart = this.cartService.getCart();
      this.sortedData = this.cart.items.slice();
    this.filteredProduct = [];

    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProduct = this.products = products;

        if (this.products) {
          for (let i=0;i<this.cart.items.length;i++) {
            this.filteredProduct = (this.cart.items[i].productId) ?
          this.products.filter(p =>
            p.key == this.cart.items[i].productId) :
          this.products;
            this.titles.push(this.filteredProduct[0].payload.val().title)
          }
          this.filteredProduct = (this.cart.items[0].productId) ?
          this.products.filter(p =>
            p.key == this.cart.items[0].productId) :
          this.products;

        }

    });
    console.log("titles", this.titles)
   }

   sortData(sort: Sort) {
    const data = this.cart.items.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'quantity': return this.compare(a.quantity, b.quantity, isAsc);
        default: return 0;
      }
    });
  }

  getTitle(item: any) {
    return item.title;
  }

  getQuantity(item: any) {
    let cart = this.cartService.getCart();
    if (!cart) return 0;
    for (let i=0;i<cart.items.length;i++) {
      if (cart.items[i].title == item.title) return cart.items[i].quantity;
    }
    return 0;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  async ngOnInit(){
  }

  updateItemQuantity(productId: string, change: number){
    this.filteredProduct = (productId) ?
          this.products.filter(p =>
            p.key == productId) : this.products;
            console.log(this.filteredProduct[0])
    this.cartService.updateItemQuantity(this.filteredProduct[0], change);
    let cart = this.cartService.getCart();
    this.sortedData = this.cart.items.slice();
  }

  getTotalItems() {
    let cart = this.cartService.getCart();
    if (cart) return cart.shoppingCartItemCount;
    return 0;
  }

  getTotal() {
    let cart = this.cartService.getCart();
    if (!cart) return 0;
    let total = 0;
    for (let i=0;i<cart.items.length;i++) {
      total += cart.items[i].quantity * cart.items[i].price;
    }
    return total;
  }
}
