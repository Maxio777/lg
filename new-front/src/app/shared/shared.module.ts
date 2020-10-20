import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {SidePanelComponent} from '@core/side-panel/side-panel.component';
import {UiModule} from './ui/ui.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

const MODULES = [
  MaterialModule,
  UiModule,
  NgxSkeletonLoaderModule
];


@NgModule({
  declarations: [SidePanelComponent],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES,
    SidePanelComponent
  ]
})
export class SharedModule {
}
