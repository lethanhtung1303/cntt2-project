import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "../domain/lecturer";

export interface SubjectResponse {
    status: number,
    results: {
        subjects: Subject[];
    }
}

@Injectable({
    providedIn: 'root'
})
export class SubjectService {

    apiUrl: string = 'http://localhost:8080/v1/';
    getAllSubjectEndPoint: string = 'subject';

    constructor(private httpClient: HttpClient) {
    }

    getAllSubject(): Observable<SubjectResponse> {
        const headers: HttpHeaders = new HttpHeaders().append(
            'content-type',
            'application/json'
        );
        return this.httpClient.get<SubjectResponse>(
            this.apiUrl + this.getAllSubjectEndPoint,
            {
                headers: headers,
            }
        );
    }
}
