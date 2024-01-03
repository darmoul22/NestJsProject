import {ChangeDetectionStrategy, Component, DestroyRef, inject, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {ServiceModel} from "../../../../../core/models/service.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-service-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './service-dialog.component.html',
  styleUrl: './service-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceDialogComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  serviceForm!: FormGroup;
  selectedService !: ServiceModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ServiceModel,
    private dialogRef: MatDialogRef<ServiceDialogComponent>,
    private fb: FormBuilder
  ) {
    this.selectedService = data ? data : new ServiceModel();
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.serviceForm = this.fb.group({
      name:  [this.selectedService.name, Validators.required],
      description: [this.selectedService.description, Validators.required],
    })
    this.serviceForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((formValues) => {
      this.selectedService.name = formValues.name;
      this.selectedService.description = formValues.description;
    });
  }

  onSubmit() {
    console.log(this.selectedService)
    this.dialogRef.close(
      {
        action: 'submit',
        service : this.selectedService
      }
    );
  }
}
