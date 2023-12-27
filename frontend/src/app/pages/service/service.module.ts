import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import {StoreModule} from "@ngrx/store";
import {serviceReducer} from "./service-store/service.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ServiceEffects} from "./service-store/service.effects";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('service',serviceReducer),
    EffectsModule.forFeature([ServiceEffects]),
    CommonModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
