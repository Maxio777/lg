import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddItemsComponent} from '../assets/components/add-items/add-items.component';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';

@NgModule({
  declarations: [AddItemsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxTrimDirectiveModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AddItemsComponent,
    NgxTrimDirectiveModule,
  ]
})
export class SharedModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icons.svg'));
  }
}
