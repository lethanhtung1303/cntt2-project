import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forbiddenValueValidator} from "../../helper/validators";
import {LoginRequest} from "../../domain/authentication";
import {AuthenticationService, UserResponse} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {GlobalErrorService} from "../../service/global-error.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: LoginRequest = {inputUserName: '', inputPassword: ''};

  loginForm!: FormGroup;

  constructor(private authentication: AuthenticationService, private router: Router, public globalErrorService: GlobalErrorService) {
  }

  get inputUserName() {
    return this.loginForm.get('inputUserName')!;
  }

  get inputPassword() {
    return this.loginForm.get('inputPassword')!;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        inputUserName: new FormControl(this.user.inputUserName, [
          Validators.required,
          Validators.minLength(3)
        ]),
        inputPassword: new FormControl(this.user.inputPassword, [
          Validators.required,
          Validators.minLength(6),
          forbiddenValueValidator(/^123456$/)
        ]),
      },
    );
  }

  onSubmit() {
    this.authentication.login(this.loginForm.value).subscribe({
      next: async (data: UserResponse) => {
        sessionStorage.setItem('UserID', data.results.user.userID ?? '');
        sessionStorage.setItem('UserName', data.results.user.userName ?? '');
        sessionStorage.setItem('EmployeeID', data.results.user.employeeID ?? '');
        sessionStorage.setItem('Password', data.results.user.password ?? '');
        sessionStorage.setItem('userRoles', data.results.userRoles ?? '');

        this.router.navigate(['']).then(() => window.location.reload());
      },
      error: (error) => {
        if (error.status == 400) {
          this.globalErrorService.setGlobalError(error.error.results[0].message, error.error.results[0].errorCd)
        } else {
          let message: string = "Something went wrong here."
          this.globalErrorService.setGlobalError(message, error.error.results[0].errorCd)
        }
      },
    });
  }

}
