import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-site-header',
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.css'],
})
export class SiteHeaderComponent implements OnInit {

    userRoles: string | null = '';

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.userRoles = localStorage.getItem('userRoles') ?? null
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']).then(() => window.location.reload());
    }
}
