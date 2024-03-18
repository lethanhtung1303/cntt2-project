import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHelper } from '../../helper/user-helper';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
})
export class SiteHeaderComponent implements OnInit {
  isSidebarVisible: boolean = false;
  userName: string;
  userRoles: string | null = '';

  constructor(
    private router: Router,
    private userHelper: UserHelper,
  ) {
    this.userName = userHelper.getUserLogin();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  ngOnInit(): void {
    this.userRoles = this.userHelper.getUserRoles();
  }

  logout() {
    this.router.navigate(['/login']).then(() => {
      localStorage.removeItem('userInfo');
      window.location.reload();
    });
  }
}
