import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('btn') btn: ElementRef | undefined = undefined;
  private sub: Subscription = new Subscription();
  form: FormGroup = this.initForm();

  constructor(private authService: AuthService, private router: Router) {
    this.initForm();
  }

  ngOnInit() {
    this.sub.add(this.authService.isAuth$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/']);
      }
    }));
  }

  initForm() {
    return new FormGroup({
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl('',  [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): any {
    this.markDirtyAndTouched(this.form);
    if (this.form && this.form.value && this.form.valid) {
      const val = {...this.form.value};
      this.authService.login(val);
    }
  }

  markDirtyAndTouched(form: FormGroup) {
    Object.keys(this.form.controls).forEach(control => {
      form.controls[control].markAsDirty();
      form.controls[control].markAsTouched();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
