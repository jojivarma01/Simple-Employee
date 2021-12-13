import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeScreenRoutingModule } from './home-screen-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    HomeScreenRoutingModule,
  ]
})
export class HomeScreenModule { }
