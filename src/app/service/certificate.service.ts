import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SelectItem} from "primeng/api/selectitem";
import {CertificateCreateRequest, CertificateDeleteRequest} from "../domain/certificate";

export interface CertificateTypeResponse {
  status: number,
  results: {
    certificateType: SelectItem[]
  }
}

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
export class CertificateService {

  apiUrl: string = 'http://localhost:8080/v1/';
  getAllCertificateTypeEndPoint: string = 'certificateType';
  deleteEndPoint: string = 'deleteCertificate';
  createEndPoint: string = 'createCertificate';

  constructor(private httpClient: HttpClient) {
  }

  getAllCertificateType(): Observable<CertificateTypeResponse> {
    const headers: HttpHeaders = new HttpHeaders().append(
      'content-type',
      'application/json'
    );
    return this.httpClient.get<CertificateTypeResponse>(
      this.apiUrl + this.getAllCertificateTypeEndPoint,
      {
        headers: headers,
      }
    );
  }

  deleteCertificate(certificateDeleteRequest: CertificateDeleteRequest): Observable<DeleteResponse> {
    const body = JSON.stringify(certificateDeleteRequest);
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

  createCertificate(request: CertificateCreateRequest): Observable<CreateResponse> {
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
