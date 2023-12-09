import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SelectItemGroup} from "primeng/api/selectitemgroup";

export interface SemesterResponse {
    status: number,
    results: {
        semesters: SelectItemGroup[]
    }
}

@Injectable({
    providedIn: 'root'
})
export class SemesterService {

    apiUrl: string = 'http://localhost:8080/v1/';
    getAllSemesterEndPoint: string = 'semester';

    constructor(private httpClient: HttpClient) {
    }

    getAllSemester(): Observable<SemesterResponse> {
        const headers: HttpHeaders = new HttpHeaders().append(
            'content-type',
            'application/json'
        );
        return this.httpClient.get<SemesterResponse>(
            this.apiUrl + this.getAllSemesterEndPoint,
            {
                headers: headers,
            }
        );
    }
}
