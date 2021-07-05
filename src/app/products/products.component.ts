import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$:any;
  categories$:any;
  category: string | null;
  products:any[];
  filteredProducts:any[];
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute ) {
    //this.products$ = productService.getAll();
    this.filteredProducts = [];
    this.categories$ = categoryService.getAll();

    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      console.log("aca1", this.filteredProducts);
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        console.log("aca2", this.filteredProducts);
        if (this.products) {
          this.filteredProducts = (this.category) ?
          this.products.filter(p =>
            p.payload.val().category == this.category) :
          this.products;
          console.log(this.filteredProducts);
        }
      });
    });






   }

  ngOnInit() {



  }
}
