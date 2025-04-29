import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesAdminPageRoutingModule } from './pages-admin-routing.module';

import { PagesAdminPage } from './pages-admin.page';
import { HeaderAdminModule } from 'src/app/components/header-admin/header-admin.module';
import { MenuAdminModule } from 'src/app/components/menu-admin/menu-admin.module';
import { HomeAdminComponent } from './home/home-admin.component';
import { AgendamentosPageModule } from './agendamentos/agendamentos.module';
import { SettingsPage } from './settings/settings.page';
import { ServicosPageModule } from './servicos/servicos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesAdminPageRoutingModule,
    HeaderAdminModule,
    MenuAdminModule,
    AgendamentosPageModule,
    ServicosPageModule
  ],
  declarations: [PagesAdminPage, HomeAdminComponent, SettingsPage]
})
export class PagesAdminPageModule { }
