import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { AllCategorysComponent } from './all-categorys/all-categorys.component';
import { MapComponent } from './map/map.component';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { HomeServicesComponent } from './home-services/home-services.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    AllShopsComponent,
    AllCategorysComponent,
    MapComponent,
    ShopsListComponent,
    HomeServicesComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
