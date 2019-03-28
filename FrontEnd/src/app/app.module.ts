import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsComponent} from './products/products.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductService} from './service/product.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
  ],
  imports: [AppRoutingModule, FormsModule, HttpClientModule, ToastrModule.forRoot(), BrowserAnimationsModule],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
