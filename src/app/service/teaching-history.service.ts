import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TeachingDiaryDetailResponse,
  TeachingDiaryUpdateRequest,
} from '../domain/lecturer';

export interface TeachingDiaryResponse {
  status: number;
  results: {
    teachingDiary: TeachingDiaryDetailResponse[];
  };
}

export interface UpdateResponse {
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeachingDiaryService {
  apiUrl: string = 'http://localhost:8080/v1/';
  teachingDiaryEndPoint: string = 'teachingDiary';
  updateEndPoint: string = 'updateTeachingDiary';

  constructor(private httpClient: HttpClient) {}

  getTeachingDiary(historyId: string): Observable<TeachingDiaryResponse> {
    const queryParams: HttpParams = new HttpParams().append(
      'historyId',
      historyId,
    );
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.get<TeachingDiaryResponse>(
      this.apiUrl + this.teachingDiaryEndPoint,
      {
        params: queryParams,
        headers: headers,
      },
    );
  }

  updateTeachingDiary(
    teachingDiaryUpdateRequest: TeachingDiaryUpdateRequest,
  ): Observable<UpdateResponse> {
    console.log(teachingDiaryUpdateRequest);
    const body = JSON.stringify(teachingDiaryUpdateRequest);
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.put<UpdateResponse>(
      this.apiUrl + this.updateEndPoint,
      body,
      { headers: headers },
    );
  }
}
