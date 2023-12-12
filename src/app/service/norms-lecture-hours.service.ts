import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {NormsLectureHours} from "../domain/lecturer";

export interface NormsLectureHoursResponse {
  status: number,
  results: {
    normsLectureHours: NormsLectureHours[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class NormsLectureHoursService {

  apiUrl: string = 'http://localhost:8080/v1/';
  normsLectureHoursEndPoint: string = 'normsLectureHours';

  constructor(private httpClient: HttpClient) {
  }

  getNormsLectureHours(semester: number): Observable<NormsLectureHoursResponse> {
    const queryParams: HttpParams = new HttpParams().append('semester', semester);
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.get<NormsLectureHoursResponse>(
      this.apiUrl + this.normsLectureHoursEndPoint,
      {
        params: queryParams,
        headers: headers,
      }
    );
  }
}
