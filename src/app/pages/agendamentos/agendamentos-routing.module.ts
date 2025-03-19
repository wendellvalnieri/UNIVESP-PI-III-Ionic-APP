import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentosPage } from './agendamentos.page';
import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';

const routes: Routes = [
  {
    path: '',
    component: AgendamentosPage
  },
  {
    path: 'form',
    component: AgendamentoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosPageRoutingModule { }
