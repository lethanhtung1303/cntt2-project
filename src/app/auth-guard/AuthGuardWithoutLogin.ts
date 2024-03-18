import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserHelper } from '../helper/user-helper';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardWithoutLogin implements CanActivate {
  constructor(
    private router: Router,
    private userHelper: UserHelper,
  ) {}

  canActivate(): boolean {
    if (this.checkUserPermissions()) {
      return true;
    } else {
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
      return false;
    }
  }

  private checkUserPermissions(): boolean {
    const userName = this.userHelper.getUserName();
    return !userName;
  }
}
