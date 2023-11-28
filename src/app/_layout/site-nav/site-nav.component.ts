import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserHelper} from "../../helper/user-helper";

@Component({
    selector: 'app-site-nav',
    templateUrl: './site-nav.component.html',
    styleUrls: ['./site-nav.component.css']
})
export class SiteNavComponent {

    userName: string;

    constructor(private router: Router, private userHelper: UserHelper) {
        this.userName = userHelper.getUserLogin()
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']).then(() => window.location.reload());
    }
}
