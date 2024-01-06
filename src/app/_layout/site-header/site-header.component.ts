import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserHelper} from "../../helper/user-helper";

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
})
export class SiteHeaderComponent implements OnInit {
  userName: string;

  userRoles: string | null = '';

  constructor(private router: Router, private userHelper: UserHelper) {
    this.userName = userHelper.getUserLogin()
  }

  ngOnInit(): void {
    this.userRoles = localStorage.getItem('userRoles') ?? null
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
