import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AssignmentRequest,
  UploadAssignmentRequest,
} from '../domain/teaching-assignment';

export interface CreateResponse {
  status: number;
  message: string;
}

export interface UploadResponse {
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  apiUrl: string = 'http://localhost:8080/v1/';
  createEndPoint: string = 'teachingAssignment';
  uploadEndPoint: string = 'uploadLectureTime';

  constructor(private httpClient: HttpClient) {}

  createAssignment(
    assignmentRequest: AssignmentRequest,
  ): Observable<CreateResponse> {
    const body = JSON.stringify(assignmentRequest);
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

  uploadLectureTime(
    uploadAssignmentRequest: UploadAssignmentRequest,
  ): Observable<UploadResponse> {
    const body = JSON.stringify(uploadAssignmentRequest);
    const headers = new HttpHeaders().append(
      'content-type',
      'application/json',
    );
    return this.httpClient.post<UploadResponse>(
      this.apiUrl + this.uploadEndPoint,
      body,
      { headers: headers },
    );
  }
}
