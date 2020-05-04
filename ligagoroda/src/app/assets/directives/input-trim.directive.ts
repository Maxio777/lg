import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInputTrim]'
})

export class InputTrimDirective {
  constructor(private el: ElementRef) {
  }
  @Output() inputTrim = new EventEmitter<string>();
  @HostListener('input', ['$event'])
  onInputChange() {
    let val: string;
    let newVal: string;
    const reg = /\s/;
    val = this.el.nativeElement.value;
    if (val.match(reg)) {
      newVal = val.trim();
      this.inputTrim.emit(newVal);
    }
  }
}
