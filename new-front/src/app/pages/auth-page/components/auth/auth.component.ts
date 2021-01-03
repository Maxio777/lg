import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/services/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'lg-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  form: FormGroup = this.initForm();
  hide = true;

  constructor(private authService: AuthService, private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
    this.sub.add(this.authService.isAuth$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['admin']);
      }
    }));
  }

  initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl('',  [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): any {
    if (this.form && this.form.valid) {
      this.form.disable();
      this.sub.add(this.authService.login(this.form.value).subscribe(
        () => true,
        () => this.form.enable()
      ));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
