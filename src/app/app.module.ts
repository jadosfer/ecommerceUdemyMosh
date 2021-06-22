import { AdminAuthGuard as AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { MatNavbarComponent } from './mat-navbar/mat-navbar.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './Material/Material.module';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    MatNavbarComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

  ],
  providers: [AuthService, AuthGuard, UserService, AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
