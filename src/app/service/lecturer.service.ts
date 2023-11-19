import {Injectable} from '@angular/core';
import {Lecturer} from "../domain/lecturer";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

export interface LecturerResponse {
  status: number,
  results: {
    resultsTotalCount: number,
    lecturers: Lecturer[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  apiUrl: string = 'http://localhost:8080/v1/';
  loginEndPoint: string = 'lecturer';

  constructor(private httpClient: HttpClient) {
  }

  getLecturerById(lecturerId: string): Observable<LecturerResponse> {
    const queryParams: HttpParams = new HttpParams().append('lecturerIds', lecturerId);
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.get<LecturerResponse>(
      this.apiUrl + this.loginEndPoint,
      {
        params: queryParams,
        headers: headers,
      }
    );
  }

  getAllLecturer(): Observable<LecturerResponse> {
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.get<LecturerResponse>(
      this.apiUrl + this.loginEndPoint,
      {
        headers: headers,
      }
    );
  }
}
