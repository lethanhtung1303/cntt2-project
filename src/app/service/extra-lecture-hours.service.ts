import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ExtraLectureHours} from "../domain/lecturer";

export interface ExtraLectureHoursResponse {
  status: number,
  results: {
    extraLectureHours: ExtraLectureHours[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExtraLectureHoursService {

  apiUrl: string = 'http://localhost:8080/v1/';
  extraHoursForContractualEndPoint: string = 'extraHoursContractual';

  constructor(private httpClient: HttpClient) {
  }

  getExtraHoursForContractual(semester: number): Observable<ExtraLectureHoursResponse> {
    const queryParams: HttpParams = new HttpParams().append('semester', semester);
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.get<ExtraLectureHoursResponse>(
      this.apiUrl + this.extraHoursForContractualEndPoint,
      {
        params: queryParams,
        headers: headers,
      }
    );
  }
}
