import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentosPageRoutingModule } from './agendamentos-routing.module';

import { AgendamentosPage } from './agendamentos.page';
import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentosPageRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [AgendamentosPage, AgendamentoFormComponent]
})
export class AgendamentosPageModule { }
