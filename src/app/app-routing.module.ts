import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  //{ path: "", redirectTo: "home", pathMatch: "full" },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'my/orders', component: MyOrdersComponent },
  { path: 'products', component: ProductsComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },
  { path: "check-out", component: CheckOutComponent },
  { path: "order-success", component: OrderSuccessComponent },
  { path: "login", component: LoginComponent },
  { path: "admin/products", component: AdminProductsComponent },
  { path: "admin/orders", component: AdminOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
