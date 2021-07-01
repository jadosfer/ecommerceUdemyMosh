import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import {Sort} from '@angular/material/sort';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['title', 'price', 'edit'];
  dataSource: any;
  products:any[];
  sortedData:any[];
  filteredProducts:any[];
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
     this.subscription = this.productService.getAll().subscribe(products => {
       this.filteredProducts = this.products = products;
       this.dataSource = new MatTableDataSource<any>(this.filteredProducts);
       this.dataSource.paginator = this.paginator;
     });
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    this.dataSource = new MatTableDataSource<any>(this.filteredProducts);
    this.dataSource.paginator = this.paginator;

  }

  sortData(sort: Sort) {
    const data = this.filteredProducts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.payload.val().title, b.payload.val().title, isAsc);
        case 'price': return compare(a.payload.val().price, b.payload.val().price, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.sortedData);
    this.dataSource.paginator = this.paginator;
  }


  ngOnDestroy() {
  //   this.subscription.unsubscribe();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
