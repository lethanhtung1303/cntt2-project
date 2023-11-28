import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SelectItem} from "primeng/api/selectitem";

export interface SchoolYearResponse {
    status: number,
    results: {
        schoolYear: SelectItem[]
    }
}

@Injectable({
    providedIn: 'root'
})
export class SchoolYearService {

    apiUrl: string = 'http://localhost:8080/v1/';
    getSchoolYearEndPoint: string = 'schoolYear';

    constructor(private httpClient: HttpClient) {
    }

    getAllSchoolYear(): Observable<SchoolYearResponse> {
        const headers: HttpHeaders = new HttpHeaders().append(
            'content-type',
            'application/json'
        );
        return this.httpClient.get<SchoolYearResponse>(
            this.apiUrl + this.getSchoolYearEndPoint,
            {
                headers: headers,
            }
        );
    }
}
