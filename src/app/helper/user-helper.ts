import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserHelper {
  constructor(private router: Router) {}

  public getUserLogin(): string {
    const storedData = this.getWithExpiry();
    let user: string | null = null;
    if (storedData) {
      user = storedData.UserName;
    }
    return user as string;
  }

  public getUserName(): string | null {
    const storedData = this.getWithExpiry();
    let userName: string | null = null;
    if (storedData) {
      userName = storedData.UserID;
    }
    return userName;
  }

  public getUserRoles(): string | null {
    const storedData = this.getWithExpiry();
    let userRoles: string | null = null;
    if (storedData) {
      userRoles = storedData.userRoles;
    }
    return userRoles;
  }

  getWithExpiry(): any | null {
    const itemString = localStorage.getItem('userInfo');
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(itemString);
    if (new Date().getTime() > item.expiry) {
      this.router.navigate(['/login']).then(() => {
        localStorage.removeItem('userInfo');
        window.location.reload();
      });
      return null;
    }
    return item;
  }
}
