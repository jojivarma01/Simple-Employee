import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ColorChangeDirective } from './directives/color-change.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FullNamePipe,
    ColorChangeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FullNamePipe,
    ColorChangeDirective
  ]
})
export class SharedModuleModule { }
