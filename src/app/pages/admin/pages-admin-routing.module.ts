import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesAdminPage } from './pages-admin.page';
import { HomeAdminComponent } from './home/home-admin.component';

const routes: Routes = [
  {
    path: '',
    component: PagesAdminPage,
    children: [
      {
        path: '',
        component: HomeAdminComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesAdminPageRoutingModule { }
