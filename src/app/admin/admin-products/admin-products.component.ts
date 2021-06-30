import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['title', 'price', 'edit'];
  dataSource: any;
  products:any[];
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


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
