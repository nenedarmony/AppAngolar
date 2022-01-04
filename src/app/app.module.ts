import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { AllCategorysComponent } from './all-categorys/all-categorys.component';
import { MapComponent } from './map/map.component';
import { HomeServicesComponent } from './home-services/home-services.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


//importing AgmCoreModule from @agm/core
import {  AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    AllShopsComponent,
    AllCategorysComponent,
    MapComponent,
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
      clientId: '<mandatory>',
      apiKey:'AIzaSyDvKT_FGvYrFHjJ_aNZzQjapB0P9WXm-Dk',
      libraries: ['geometry', 'places'],
      apiVersion: 'quarterly'
    })
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
