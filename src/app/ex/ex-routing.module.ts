import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExComponent } from './ex.component';

const routes: Routes = [{ path: '', component: ExComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExRoutingModule { }
