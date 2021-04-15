import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { AllCategorysComponent } from './all-categorys/all-categorys.component';
import { MapComponent } from './map/map.component';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { HomeServicesComponent } from './home-services/home-services.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ShopsService } from './services/shops.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllShopsComponent,
    AllCategorysComponent,
    MapComponent,
    ShopsListComponent,
    HomeServicesComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ShopsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
