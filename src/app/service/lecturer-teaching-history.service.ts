import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LecturerTeachingHistory} from "../domain/lecturer";

export interface TeachingHistoryResponse {
  status: number,
  results: {
    teachingHistory: LecturerTeachingHistory[]
  }
}

export interface TeachingHistoryRequest {
  lecturerId?: number;
  semester?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LecturerTeachingHistoryService {

  apiUrl: string = 'http://localhost:8080/v1/';
  teachingHistoryEndPoint: string = 'getTeachingHistory';

  constructor(private httpClient: HttpClient) {
  }

  getTeachingHistory(request: TeachingHistoryRequest): Observable<TeachingHistoryResponse> {
    const body = JSON.stringify(request);
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.post<TeachingHistoryResponse>(
      this.apiUrl + this.teachingHistoryEndPoint,
      body,
      {headers: headers}
    );
  }
}
