import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicosPageRoutingModule } from './servicos-routing.module';

import { ServicosPage } from './servicos.page';
import { ServicoDetalheComponent } from './servico-detalhe/servico-detalhe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ServicosPageRoutingModule
  ],
  declarations: [ServicosPage, ServicoDetalheComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicosPageModule { }
