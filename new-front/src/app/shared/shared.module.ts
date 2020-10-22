import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {UiModule} from './ui/ui.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

const MODULES = [
  MaterialModule,
  UiModule,
  NgxSkeletonLoaderModule
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
