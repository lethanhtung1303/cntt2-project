import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forbiddenValueValidator} from "../../helper/validators";
import {LoginRequest} from "../../domain/authentication";
import {AuthenticationService, UserResponse} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: LoginRequest = {inputUserName: '', inputPassword: ''};

  loginForm!: FormGroup;

  constructor(private authentication: AuthenticationService, private router: Router) {
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
          console.log("BusinessException");
          if (error.error.results[0].errorCd === 'ERROR_NOT_NULL_VALIDATION' || error.error.results[1].errorCd === 'ERROR_NOT_NULL_VALIDATION') {
            console.log("Vui lòng nhập Tài khoản hoặc mật khẩu !");
          }

          if (error.error.results[0].errorCd === '40001') {
            console.log("Tài khoản hoặc mật khẩu không đúng !");
          }

          if (error.error.results[0].errorCd === '40002') {
            console.log("Tài khoản của bạn đã bị khóa , vui lòng liên hệ bộ phận quản lý !");
          }

          console.log(error.error.results[0].errorCd);
          console.log(error.error.results[0].errorCd === 'ERROR_NOT_NULL_VALIDATION');
          console.log(error.error.results[0].message);
        } else {
          console.error("RuntimeException");
          console.error(error);
        }
      },
    });
  }

}
