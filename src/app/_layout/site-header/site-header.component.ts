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
    this.userRoles = sessionStorage.getItem('userRoles') ?? null
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
