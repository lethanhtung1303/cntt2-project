import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LecturerTeachingHistory } from '../domain/lecturer';

export interface TeachingHistoryResponse {
  status: number;
  results: {
    teachingHistory: LecturerTeachingHistory[];
  };
}

export interface DeleteResponse {
  status: number;
  message: string;
}

export interface TeachingHistoryDeleteRequest {
  historyId: string;
  deleteBy: string;
}

export interface TeachingHistoryRequest {
  lecturerId?: number;
  semester?: number;
}

@Injectable({
  providedIn: 'root',
})
export class LecturerTeachingHistoryService {
  apiUrl: string = 'http://localhost:8080/v1/';
  teachingHistoryEndPoint: string = 'getTeachingHistory';
  teachingHistoryDetailEndPoint: string = 'teachingHistoryDetail';
  deleteEndPoint: string = 'deleteTeachingHistory';

  constructor(private httpClient: HttpClient) {}

  getTeachingHistory(
    request: TeachingHistoryRequest,
  ): Observable<TeachingHistoryResponse> {
    const body = JSON.stringify(request);
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.post<TeachingHistoryResponse>(
      this.apiUrl + this.teachingHistoryEndPoint,
      body,
      { headers: headers },
    );
  }

  getTeachingHistoryDetail(
    historyId: string,
  ): Observable<TeachingHistoryResponse> {
    const queryParams: HttpParams = new HttpParams().append(
      'historyId',
      historyId,
    );
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.get<TeachingHistoryResponse>(
      this.apiUrl + this.teachingHistoryDetailEndPoint,
      {
        params: queryParams,
        headers: headers,
      },
    );
  }

  deleteHistory(
    historyDeleteRequest: TeachingHistoryDeleteRequest,
  ): Observable<DeleteResponse> {
    const body = JSON.stringify(historyDeleteRequest);
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    const httpOptions = {
      body: body,
      headers: headers,
    };
    return this.httpClient.delete<DeleteResponse>(
      this.apiUrl + this.deleteEndPoint,
      httpOptions,
    );
  }
}
