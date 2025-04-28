import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfissionaisPageRoutingModule } from './profissionais-routing.module';

import { ProfissionaisPage } from './profissionais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfissionaisPageRoutingModule
  ],
  declarations: [ProfissionaisPage]
})
export class ProfissionaisPageModule {}
