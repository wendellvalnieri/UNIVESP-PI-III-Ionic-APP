import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentosPageRoutingModule } from './agendamentos-routing.module';

import { AgendamentosPage } from './agendamentos.page';
import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';
import { HeaderAdminModule } from 'src/app/components/header-admin/header-admin.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AgendamentosPageRoutingModule,
    HeaderAdminModule
  ],
  declarations: [AgendamentosPage, AgendamentoFormComponent]
})
export class AgendamentosPageModule { }
