import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../domain/authentication';
import {
  AuthenticationService,
  UserResponse,
} from '../../service/authentication.service';
import { Router } from '@angular/router';
import {
  ErrorResponse,
  GlobalErrorService,
} from '../../service/global-error.service';
import { forbiddenValueValidator } from '../../helper/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  err: ErrorResponse = { errMessage: null, errorCode: null };

  user: LoginRequest = { inputUserName: '', inputPassword: '' };

  loginForm!: FormGroup;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    protected globalErrorService: GlobalErrorService,
  ) {
    this.loginForm = new FormGroup({
      inputUserName: new FormControl(this.user.inputUserName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      inputPassword: new FormControl(this.user.inputPassword, [
        Validators.required,
        Validators.minLength(6),
        forbiddenValueValidator(/^123456$/),
      ]),
    });
  }

  get inputUserName() {
    return this.loginForm.get('inputUserName')!;
  }

  get inputPassword() {
    return this.loginForm.get('inputPassword')!;
  }

  onInputFocus() {
    this.globalErrorService.clearError();
  }

  setWithExpiry(data: UserResponse): void {
    const item = {
      UserID: data.results.user.userID ?? '',
      UserName: data.results.user.userName ?? '',
      EmployeeID: data.results.user.employeeID ?? '',
      Password: data.results.user.password ?? '',
      userRoles: data.results.userRoles ?? '',
      expiry: new Date().getTime() + 60 * 1000,
    };
    localStorage.setItem('userInfo', JSON.stringify(item));
  }

  onSubmit() {
    this.globalErrorService.clearError();
    this.authentication.login(this.loginForm.value).subscribe({
      next: async (data: UserResponse) => {
        this.setWithExpiry(data);
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        if (error.status === 400) {
          this.err = {
            errMessage: error.error.results[0].message,
            errorCode: error.error.results[0].errorCd,
          };
          this.globalErrorService.setGlobalError(this.err);
        } else {
          this.err = {
            errMessage: 'Something went wrong here.',
            errorCode: error.error.results[0].errorCd,
          };
          this.globalErrorService.setGlobalError(this.err);
        }
      },
    });
  }
}
