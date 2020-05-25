import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
  public isLoggedIn = false;

  constructor(private router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
    }
    return this.isLoggedIn;
  }

  // Below methods are implemented temporary to simulate login feature

  public setLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
    }
  }

  public validateUser(userName: string, password: string): boolean {
    const pass = localStorage.getItem(userName);
    return pass && pass === password;
  }

  public createUser(userName: string, password: string): boolean {
    if (localStorage.getItem(userName)) {
      return false;
    }
    localStorage.setItem(userName, password);
    return true;
  }
}
