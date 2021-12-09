import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ColorChangeDirective } from './directives/color-change.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    FullNamePipe,
    ColorChangeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    FullNamePipe,
    ColorChangeDirective
  ]
})
export class SharedModuleModule { }
