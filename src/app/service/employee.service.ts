import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Employee} from "../domain/employee";

export interface EmployeeResponse {
  status: number,
  results: {
    resultsTotalCount: number,
    employees: Employee[]
  }
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string = 'http://localhost:8080/v1/';
  geEmployeeEndPoint: string = 'employee';

  constructor(private httpClient: HttpClient) {
  }
  
  getEmployee(): Observable<EmployeeResponse> {
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json'
    );

    return this.httpClient.get<EmployeeResponse>(
      this.apiUrl + this.geEmployeeEndPoint,
      {
        headers: headers,
      }
    );
  }
}
