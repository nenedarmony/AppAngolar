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

//importing AgmCoreModule from @agm/core
import {  AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

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
    AppRoutingModule,
    
    //add AgmCoreModule
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDvKT_FGvYrFHjJ_aNZzQjapB0P9WXm-Dk',
      libraries:['places'],
      apiVersion: 'quarterly'
    })
  ],
  providers: [ShopsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
