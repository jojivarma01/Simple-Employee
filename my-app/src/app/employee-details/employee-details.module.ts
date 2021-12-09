import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDetailsRoutingModule } from './employee-details-routing.module';
import { EmployeeDetailsComponent } from './employee-details.component';
import { FullNamePipe } from '../shared-module/pipes/full-name.pipe';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    EmployeeDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    EmployeeDetailsRoutingModule
  ]
})
export class EmployeeDetailsModule { }
