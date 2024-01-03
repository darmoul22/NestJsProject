import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {TablerIconsModule} from "angular-tabler-icons";
import {ServiceModel} from "../../../../../core/models/service.model";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Store} from "@ngrx/store";
import { ServiceActions } from '../../../service-store';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    NgForOf,
    TablerIconsModule,
    MatTooltipModule
  ],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ServicesListComponent {
  @Input() services : ServiceModel[] = []

  constructor(private readonly store: Store) {
  }
  selectService(id: number) {
    this.store.dispatch(ServiceActions.selectService({selectedServiceId: id}))
  }
}
