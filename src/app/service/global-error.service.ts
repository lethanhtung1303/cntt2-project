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

  clearError() {
    this.globalError.errMessage = null;
    this.globalError.errorCode = null;
  }

  setGlobalError(error: ErrorResponse) {
    this.globalError.errMessage = error.errMessage;
    this.globalError.errorCode = error.errorCode;
  }

  getGlobalError(): ErrorResponse {
    return this.globalError
  }
}
