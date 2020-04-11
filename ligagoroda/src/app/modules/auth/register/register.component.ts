import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  form: FormGroup | undefined;
  hide = true;
  logStatus: boolean = false;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
              private authService: AuthService,
              // private router: Router
  ) {
                this.initForm(fb);
              }

  ngOnInit() {

  }


  initForm(fb: FormBuilder) {
    this.form = fb.group({
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl('',  [Validators.required]),
      lastName: new FormControl('',  [Validators.required]),
      firstName: new FormControl('',  [Validators.required]),
      middleName: new FormControl('',  []),
    }, {updateOn: 'change'});
  }

  register(): void {
    if (this.form && this.form.valid) {
      this.authService.register(this.form.value);
    }
  }
}
