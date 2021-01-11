import { HttpParams } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

export function createHttpParams(params: {[key: string]: string} = {}): HttpParams {
  let httpParams: HttpParams = new HttpParams();
  Object.keys(params).forEach(param => {
    if (params[param]) {
      httpParams = httpParams.set(param, params[param]);
    }
  });
  return httpParams;
}

export function initForm(controls: string[]): FormGroup {
  const form = new FormGroup({});
  controls.forEach(name => form.addControl(name, new FormControl('')));
  return form;
}

