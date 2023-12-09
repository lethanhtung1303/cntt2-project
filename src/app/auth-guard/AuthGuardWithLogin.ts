import {Injectable} from '@angular/core';
import {CanActivateChild, Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardWithLogin implements CanActivateChild {
    constructor(private router: Router) {
    }

    canActivateChild(): boolean {
        if (this.checkUserPermissions()) {
            return true;
        } else {
            this.router.navigate(['/login']).then(() => window.location.reload());
            return false;
        }
    }

    private checkUserPermissions(): boolean {
        const userName = localStorage.getItem('UserID');
        return !!userName;

    }
}
