import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {  MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create-event',
  imports: [
     ReactiveFormsModule,
     MatFormFieldModule,
     MatButtonModule,
     MatDialogModule,
     MatInputModule
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent  {
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEventComponent>
  ) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      eventDate: ['', Validators.required],
      enabled: [true],
      defaultLayout: [false]
    });

  }

  onTypeChange(value: string) {
      this.eventForm.get('defaultLayout')?.setValue(value === 'DEFAULT');
    }

  onSubmit() {
    if (this.eventForm.valid) {
      this.dialogRef.close(this.eventForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
