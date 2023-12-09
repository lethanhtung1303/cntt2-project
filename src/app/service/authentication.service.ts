import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest, User} from "../domain/authentication";

export interface UserResponse {
  status: number,
  results: {
    userRoles: string,
    user: User
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl: string = 'http://localhost:8080/v1/';
  loginEndPoint: string = 'login';

  constructor(private httpClient: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    const body = JSON.stringify(loginRequest);
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.post<UserResponse>(
      this.apiUrl + this.loginEndPoint,
      body,
      {headers: headers}
    );
  }
}
