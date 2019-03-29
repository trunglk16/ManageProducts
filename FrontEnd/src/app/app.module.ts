import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductListComponent} from './manageProduct/product-list.component';
import {ProductService} from './service/product.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
  ],
  imports: [AppRoutingModule, FormsModule, HttpClientModule, ToastrModule.forRoot(), BrowserAnimationsModule],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
