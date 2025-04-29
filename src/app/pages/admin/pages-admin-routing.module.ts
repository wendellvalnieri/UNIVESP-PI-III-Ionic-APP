import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesAdminPage } from './pages-admin.page';
import { HomeAdminComponent } from './home/home-admin.component';
import { AgendamentosPage } from './agendamentos/agendamentos.page';
import { ServicosPage } from './servicos/servicos.page';
import { SettingsPage } from './settings/settings.page';

const routes: Routes = [
  {
    path: '',
    component: PagesAdminPage,
    children: [
      {
        path: '',
        component: HomeAdminComponent,
      },
      {
        path: 'agendamentos',
        component: AgendamentosPage,
      },
      {
        path: 'profissionais',
        component: AgendamentosPage,
      },
      {
        path: 'servicos',
        component: ServicosPage,
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesAdminPageRoutingModule { }
