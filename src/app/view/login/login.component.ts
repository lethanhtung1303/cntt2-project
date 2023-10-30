import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forbiddenValueValidator} from "../../helper/validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user = {inputEmail: '', inputPassword: ''};

  loginForm!: FormGroup;

  constructor() {
  }

  get inputEmail() {
    return this.loginForm.get('inputEmail')!;
  }

  get inputPassword() {
    return this.loginForm.get('inputPassword')!;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        inputEmail: new FormControl(this.user.inputEmail, [
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
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }

}
