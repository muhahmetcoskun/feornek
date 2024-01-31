import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModulRoutingModule } from './pipes-modul-routing.module';
import { DurumPipe } from './durum/durum.pipe';
import { EvethayirPipe } from './evethayir/evethayir.pipe';



@NgModule({
  declarations: [ 
    DurumPipe, EvethayirPipe
  ],
  imports: [
    CommonModule,
    PipesModulRoutingModule
  ],
  exports: [
    DurumPipe,EvethayirPipe
  ]
})
export class PipesModulModule { }
