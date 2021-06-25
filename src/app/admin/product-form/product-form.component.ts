import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;

  constructor(private categoryService: CategoryService, private productService: ProductService) {

    this.categories$ = categoryService.getCategories();

   }

  save(product: any) {
    this.productService.create(product);
  }

  ngOnInit(): void {
  }

}
