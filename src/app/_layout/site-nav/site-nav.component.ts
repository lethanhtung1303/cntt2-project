import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-nav',
  templateUrl: './site-nav.component.html',
  styleUrls: ['./site-nav.component.css']
})
export class SiteNavComponent implements OnInit {

  userName: string | null = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('UserName') ?? null
  }

  logout() {
    sessionStorage.clear();

    this.router.navigate(['/login']).then(() => window.location.reload());

  }
}
