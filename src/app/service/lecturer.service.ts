import {Injectable} from '@angular/core';
import {Lecturer, LecturerCreateRequest, LecturerDeleteRequest, LecturerUpdateRequest} from "../domain/lecturer";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

export interface LecturerResponse {
    status: number,
    results: {
        resultsTotalCount: number,
        lecturers: Lecturer[]
    }
}

export interface UpdateResponse {
    status: number;
    message: string;
}

export interface CreateResponse {
    status: number;
    message: string;
}

export interface DeleteResponse {
    status: number;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class LecturerService {

    apiUrl: string = 'http://localhost:8080/v1/';
    loginEndPoint: string = 'lecturer';
    updateEndPoint: string = 'updateLecturer';
    createEndPoint: string = 'createLecturer';
    deleteEndPoint: string = 'deleteLecturer';

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

    updateLecturer(lecturerUpdateRequest: LecturerUpdateRequest): Observable<UpdateResponse> {
        const body = JSON.stringify(lecturerUpdateRequest);
        const headers = new HttpHeaders().append(
            'content-type',
            'application/json'
        );
        return this.httpClient.post<UpdateResponse>(
            this.apiUrl + this.updateEndPoint,
            body,
            {headers: headers}
        );
    }

    createLecturer(lecturerCreateRequest: LecturerCreateRequest): Observable<CreateResponse> {
        const body = JSON.stringify(lecturerCreateRequest);
        const headers = new HttpHeaders().append(
            'content-type',
            'application/json'
        );
        return this.httpClient.post<CreateResponse>(
            this.apiUrl + this.createEndPoint,
            body,
            {headers: headers}
        );
    }

    deleteLecturer(lecturerDeleteRequest: LecturerDeleteRequest): Observable<DeleteResponse> {
        const body = JSON.stringify(lecturerDeleteRequest);
        const headers = new HttpHeaders().append(
            'content-type',
            'application/json'
        );
        const httpOptions = {
            body: body,
            headers: headers
        };
        return this.httpClient.delete<DeleteResponse>(
            this.apiUrl + this.deleteEndPoint,
            httpOptions
        );
    }
}
