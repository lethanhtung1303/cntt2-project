import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SatisfactionScoreCreateRequest, SatisfactionScoreDeleteRequest} from "../domain/satisfaction-score";

export interface DeleteResponse {
    status: number;
    message: string;
}

export interface CreateResponse {
    status: number;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class SatisfactionScoreService {

    apiUrl: string = 'http://localhost:8080/v1/';
    deleteEndPoint: string = 'deleteSatisfactionScore';
    createEndPoint: string = 'createSatisfactionScore';

    constructor(private httpClient: HttpClient) {
    }

    deleteSatisfactionScore(satisfactionScoreDeleteRequest: SatisfactionScoreDeleteRequest): Observable<DeleteResponse> {
        const body = JSON.stringify(satisfactionScoreDeleteRequest);
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

    createSatisfactionScore(request: SatisfactionScoreCreateRequest): Observable<CreateResponse> {
        const body = JSON.stringify(request);
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
}
