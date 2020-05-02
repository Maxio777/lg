import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
  private sub: Subscription = new Subscription();
  form: FormGroup = this.initForm();
  hide: boolean = true;

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
