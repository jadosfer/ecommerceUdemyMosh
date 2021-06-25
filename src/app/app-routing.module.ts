import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';

const routes: Routes = [
  //{ path: "", redirectTo: "home", pathMatch: "full" },

  { path: 'products', component: ProductsComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },
  { path: "login", component: LoginComponent },

  { path: "check-out", component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: "order-success", component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

  { path: "admin/products", component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: "admin/products/new", component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: "admin/orders", component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
