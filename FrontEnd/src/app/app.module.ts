import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AwesomesComponent} from './awesomes/awesomes.component';
import {AwesomeListComponent} from './awesome-list/awesome-list.component';
import {AwesomeService} from './service/awesome.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AwesomesComponent,
    AwesomeListComponent,
  ],
  imports: [AppRoutingModule, FormsModule, HttpClientModule, ToastrModule.forRoot(), BrowserAnimationsModule],
  providers: [AwesomeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
