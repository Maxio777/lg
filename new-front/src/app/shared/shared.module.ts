import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {UiModule} from './ui/ui.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const MODULES = [
  MaterialModule,
  UiModule,
  NgxSkeletonLoaderModule,
  ReactiveFormsModule,
  FormsModule
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
