import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TablerIconsModule} from "angular-tabler-icons";
import {Store} from "@ngrx/store";
import {ServiceActions, ServiceSelectors} from '../service-store';
import {EMPTY, filter, Observable, tap} from "rxjs";
import {ServiceModel} from "../../../core/models/service.model";
import {ServicesListComponent} from "./ui-components/services-list/services-list.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ServiceDialogComponent} from "./ui-components/service-dialog/service-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    TablerIconsModule,
    AsyncPipe,
    ServicesListComponent,
    NgIf,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent implements OnInit {
  services$ : Observable<ServiceModel[] | null> = this.store.select(ServiceSelectors.selectServices);
  selectedService$ : Observable<ServiceModel | null> = this.store.select(ServiceSelectors.selectActiveService);
  private destroyRef = inject(DestroyRef);

  dialogRef!: MatDialogRef<ServiceDialogComponent>
  constructor(
    private readonly store: Store,
    public dialog: MatDialog
  ) {
    this.store.dispatch(ServiceActions.pageEnter())
  }

  ngOnInit(): void {
    this.selectedService$.pipe(
      filter(service => !!service),
      tap((data) => {
        data ? this.handleDialog(data) : EMPTY
      }),
    ).subscribe()
  }
  handleDialog(data: ServiceModel){
    this.dialogRef = this.dialog.open(ServiceDialogComponent, {
      data,
    });
    this.dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.store.dispatch(ServiceActions.clearSelectedService());
      })
  }
}
