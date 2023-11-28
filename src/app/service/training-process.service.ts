import {Injectable} from '@angular/core';
import {TrainingProcessCreateRequest, TrainingProcessUpdateRequest} from "../domain/training-process";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

export interface CreateResponse {
    status: number;
    message: string;
}

export interface UpdateResponse {
    status: number;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class TrainingProcessService {

    apiUrl: string = 'http://localhost:8080/v1/';
    createProcessEndPoint: string = 'createTrainingProcess';
    updateProcessEndPoint: string = 'updateTrainingProcess';

    constructor(private httpClient: HttpClient) {
    }

    createProcess(request: TrainingProcessCreateRequest): Observable<CreateResponse> {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders().append(
            'content-type',
            'application/json'
        );
        return this.httpClient.post<CreateResponse>(
            this.apiUrl + this.createProcessEndPoint,
            body,
            {headers: headers}
        );
    }

    updateProcess(request: TrainingProcessUpdateRequest): Observable<UpdateResponse> {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders().append(
            'content-type',
            'application/json'
        );
        return this.httpClient.post<UpdateResponse>(
            this.apiUrl + this.updateProcessEndPoint,
            body,
            {headers: headers}
        );
    }
}
