import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesAdminPage } from './pages-admin.page';
import { HomeAdminComponent } from './home/home-admin.component';
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
        loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosPageModule)
      },
      {
        path: 'servicos',
        loadChildren: () => import('./servicos/servicos.module').then(m => m.ServicosPageModule)
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
