import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserHelper {
  private readonly userLogin: string = '';

  constructor(private router: Router) {
    const user: string | null = localStorage.getItem('UserName')
    if (user === null) {
      localStorage.clear();
      this.router.navigate(['/login']).then(() => window.location.reload());
    } else {
      this.userLogin = user
    }
  }

  public getUserLogin(): string {
    return this.userLogin;
  }
}
