import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { UserHelper } from '../helper/user-helper';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardWithLogin implements CanActivateChild {
  constructor(
    private router: Router,
    private userHelper: UserHelper,
  ) {}

  canActivateChild(): boolean {
    if (this.checkUserPermissions()) {
      return true;
    } else {
      this.router.navigate(['/login']).then(() => {
        localStorage.removeItem('userInfo');
        window.location.reload();
      });
      return false;
    }
  }

  private checkUserPermissions(): boolean {
    const userName = this.userHelper.getUserName();
    return !!userName;
  }
}
