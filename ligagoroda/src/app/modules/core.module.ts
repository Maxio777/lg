import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTrimDirective } from '../assets/directives/input-trim.directive';

@NgModule({
  declarations: [InputTrimDirective],
  imports: [
    CommonModule
  ],
  exports: [InputTrimDirective]
})
export class CoreModule { }
