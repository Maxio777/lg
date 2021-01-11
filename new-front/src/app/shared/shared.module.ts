import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {UiModule} from './ui/ui.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';

const MODULES = [
  MaterialModule,
  UiModule,
  NgxSkeletonLoaderModule,
  ReactiveFormsModule,
  FormsModule,
  NgxTrimDirectiveModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule {
}
