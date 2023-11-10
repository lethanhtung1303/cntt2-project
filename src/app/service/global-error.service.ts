import {Injectable} from '@angular/core';

export interface ErrorResponse {
  errMessage: string | null,
  errorCode: string | null
}

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {

  globalError: ErrorResponse = {errMessage: null, errorCode: null};

  constructor() {
  }

  setGlobalError(message: string, errorCd: string) {
    this.globalError.errMessage = message;
    this.globalError.errorCode = errorCd;
  }

  getGlobalError(): ErrorResponse {
    return this.globalError
  }
}
