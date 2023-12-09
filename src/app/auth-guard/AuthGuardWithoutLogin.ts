import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardWithoutLogin implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(): boolean {
        if (this.checkUserPermissions()) {
            return true;
        } else {
            this.router.navigate(['home']).then(() => window.location.reload());
            return false;
        }
    }

    private checkUserPermissions(): boolean {
        const userName = localStorage.getItem('UserID');
        return !userName;

    }
}
