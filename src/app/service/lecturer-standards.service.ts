import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MasterStandards, UniversityStandard} from "../domain/lecturer";

export interface UniversityStandardsResponse {
  status: number,
  results: {
    universityStandards: UniversityStandard[]
  }
}

export interface MasterStandardsResponse {
  status: number,
  results: {
    masterStandards: MasterStandards[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class LecturerStandardService {

  apiUrl: string = 'http://localhost:8080/v1/';
  universityStandardsEndPoint: string = 'universityStandards';
  masterStandardsEndPoint: string = 'masterStandards';

  constructor(private httpClient: HttpClient) {
  }

  getUniversityStandards(semester: number): Observable<UniversityStandardsResponse> {
    const queryParams: HttpParams = new HttpParams().append('semester', semester);
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.get<UniversityStandardsResponse>(
      this.apiUrl + this.universityStandardsEndPoint,
      {
        params: queryParams,
        headers: headers,
      }
    );
  }

  getMasterStandards(): Observable<MasterStandardsResponse> {
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.get<MasterStandardsResponse>(
      this.apiUrl + this.masterStandardsEndPoint,
      {
        headers: headers,
      }
    );
  }
}
