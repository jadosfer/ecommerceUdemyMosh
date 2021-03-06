import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  categories$:any;

  constructor(private categoryService: CategoryService) {
    //this.categories$ = categoryService.getAll();
    this.categories$ = categoryService.getAllCategories();
   }

  ngOnInit(): void {
  }

}
