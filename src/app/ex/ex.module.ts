import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExRoutingModule } from './ex-routing.module';
import { ExComponent } from './ex.component';


@NgModule({
  declarations: [ExComponent],
  imports: [
    CommonModule,
    ExRoutingModule
  ]
})
export class ExModule { }
