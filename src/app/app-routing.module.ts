import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCategorysComponent } from './all-categorys/all-categorys.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { HomeServicesComponent } from './home-services/home-services.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path:"home_services",component:HomeServicesComponent},
  {path:"login",component:LoginComponent},
  {path:"all_categorys",component:AllCategorysComponent},
  {path:"all_shops",component:AllShopsComponent},
  {path:"maps",component:MapComponent},

     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
