import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'price', 'edit'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

ngOnInit() {
  this.productService.getAll().subscribe(products => {
    this.dataSource = new MatTableDataSource<any>(products);
    this.dataSource.paginator = this.paginator;
  });
}


  constructor(private productService: ProductService) {
   }
}
