import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { URLS_ADMIN } from '../../../routing-configs/config-routing-admin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {

  form: FormGroup | undefined;
  hide = true;
  logStatus: boolean = false;
  private sub: Subscription = new Subscription();

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initForm(fb);
  }

  ngOnInit() {
    this.sub.add(this.authService.isAuth$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate([URLS_ADMIN.admin.player.url]);
      }
    }));
  }
  initForm(fb: FormBuilder) {
    this.form = fb.group({
      email: new FormControl('',  [Validators.required]),
      password: new FormControl('',  [Validators.required])
    }, {updateOn: 'change'});
  }

  submit(): any {
    if (this.form && this.form.value && this.form.valid) {
      // const formData = new FormData();
      // formData.append('username', this.form.controls.username.value);
      // formData.append('password', this.form.controls.password.value);
      this.authService.login(this.form.value);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
