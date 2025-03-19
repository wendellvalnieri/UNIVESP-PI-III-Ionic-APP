import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPublicPage } from './pages-public.page';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: PagesPublicPage,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPublicPageRoutingModule { }
