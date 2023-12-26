import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppDashboardComponent} from "../dashboard/dashboard.component";
import {ServiceComponent} from "./service/service.component";

const routes: Routes = [
  {
    path: '',
    component: ServiceComponent,
    data: {
      title: 'Starter Page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
