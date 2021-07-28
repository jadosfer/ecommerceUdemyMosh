import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: any;
  dataSource: any;
  paginator: any;
  displayedColumns: string[] = ['Product', 'Quantity', 'edit'];
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cartService: ShoppingCartService) {
    this.cart= this.cartService.getCart();
    console.log(this.cart);
    //console.log(this.cart.items[1].productId[0]);
   }

   sortData(sort: Sort) {

   }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<any>(this.cart.items);
    // this.dataSource.paginator = this.paginator;
  }

}
