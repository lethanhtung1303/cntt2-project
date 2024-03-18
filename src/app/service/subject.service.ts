import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  Subject,
  SubjectCreateRequest,
  SubjectDeleteRequest,
  SubjectGroup,
  SubjectTrainingSys,
  SubjectUpdateRequest,
} from '../domain/subject';

export interface SubjectResponse {
  status: number;
  results: {
    subjects: Subject[];
    resultsTotalCount: number;
  };
}

export interface SubjectGroupResponse {
  status: number;
  results: {
    subjectGroups: SubjectGroup[];
  };
}

export interface SubjectTrainingSysResponse {
  status: number;
  results: {
    resultsTotalCount: number;
    trainingSys: SubjectTrainingSys[];
  };
}

export interface DeleteResponse {
  status: number;
  message: string;
}

export interface CreateResponse {
  status: number;
  message: string;
}

export interface UpdateResponse {
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  apiUrl: string = 'http://localhost:8080/v1/';
  getAllSubjectEndPoint: string = 'subject';
  getAllSubjectGroupEndPoint: string = 'subjectGroup';
  getAllSubjectTrainingSysEndPoint: string = 'subjectTrainingSys';
  createEndPoint: string = 'createSubject';
  deleteEndPoint: string = 'deleteSubject';
  updateEndPoint: string = 'updateSubject';

  constructor(private httpClient: HttpClient) {}

  getAllSubject(): Observable<SubjectResponse> {
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.get<SubjectResponse>(
      this.apiUrl + this.getAllSubjectEndPoint,
      {
        headers: headers,
      },
    );
  }

  getAllSubjectGroup(): Observable<SubjectGroupResponse> {
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.get<SubjectGroupResponse>(
      this.apiUrl + this.getAllSubjectGroupEndPoint,
      {
        headers: headers,
      },
    );
  }

  getAllSubjectTrainingSys(): Observable<SubjectTrainingSysResponse> {
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.get<SubjectTrainingSysResponse>(
      this.apiUrl + this.getAllSubjectTrainingSysEndPoint,
      {
        headers: headers,
      },
    );
  }

  createSubject(request: SubjectCreateRequest): Observable<CreateResponse> {
    const body = JSON.stringify(request);
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.post<CreateResponse>(
      this.apiUrl + this.createEndPoint,
      body,
      { headers: headers },
    );
  }

  deleteSubject(
    subjectDeleteRequest: SubjectDeleteRequest,
  ): Observable<DeleteResponse> {
    const body = JSON.stringify(subjectDeleteRequest);
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

  getSubjectById(subjectId: string): Observable<SubjectResponse> {
    const queryParams: HttpParams = new HttpParams().append(
      'subjectIds',
      subjectId,
    );
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.get<SubjectResponse>(
      this.apiUrl + this.getAllSubjectEndPoint,
      {
        params: queryParams,
        headers: headers,
      },
    );
  }

  updateSubject(
    subjectUpdateRequest: SubjectUpdateRequest,
  ): Observable<UpdateResponse> {
    const body = JSON.stringify(subjectUpdateRequest);
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
