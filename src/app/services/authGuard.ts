import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  public isLoggedIn = false;

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['login', {}]);
    }
    return this.isLoggedIn;
  }

  public setLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
  }
}
