import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreviousRouteService {
  private previousUrl: string = '';

  public setPreviousUrl(url: string) {
    this.previousUrl = url;
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
