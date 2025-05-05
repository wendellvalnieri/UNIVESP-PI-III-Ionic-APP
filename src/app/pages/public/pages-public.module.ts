import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPublicPageRoutingModule } from './pages-public-routing.module';

import { PagesPublicPage } from './pages-public.page';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderAdminModule } from 'src/app/components/header-admin/header-admin.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesPublicPageRoutingModule,
    HeaderAdminModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PagesPublicPage, LoginComponent, HomeComponent]
})
export class PagesPublicPageModule { }
