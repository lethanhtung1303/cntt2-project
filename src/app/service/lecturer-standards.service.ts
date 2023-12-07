import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LecturerStandard} from "../domain/lecturer";

export interface LecturerStandardsResponse {
  status: number,
  results: {
    lecturerStandards: LecturerStandard[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class LecturerStandardService {

  apiUrl: string = 'http://localhost:8080/v1/';
  lecturerStandardsEndPoint: string = 'lecturerStandards';

  constructor(private httpClient: HttpClient) {
  }

  getLecturerStandards(semester: number): Observable<LecturerStandardsResponse> {
    const queryParams: HttpParams = new HttpParams().append('semester', semester);
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.get<LecturerStandardsResponse>(
      this.apiUrl + this.lecturerStandardsEndPoint,
      {
        params: queryParams,
        headers: headers,
      }
    );
  }
}
