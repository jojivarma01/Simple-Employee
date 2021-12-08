import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEmployeeRoutingModule } from './edit-employee-routing.module';
import { EditEmployeeComponent } from './edit-employee.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditEmployeeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditEmployeeRoutingModule
  ]
})
export class EditEmployeeModule { }
