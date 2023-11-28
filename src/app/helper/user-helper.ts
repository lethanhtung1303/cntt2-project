import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class UserHelper {
    private readonly userLogin: string = '';

    constructor(private router: Router) {
        const user: string | null = sessionStorage.getItem('UserName')
        if (user === null) {
            sessionStorage.clear();
            this.router.navigate(['/login']).then(() => window.location.reload());
        } else {
            this.userLogin = user
        }
    }

    public getUserLogin(): string {
        return this.userLogin;
    }
}
