import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isSignIn = true;
  public isDisabled = false;

  public username = '';
  public password = '';
  public confirmPassword = '';
  public errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {}

  public login() {
    this.errorMsg = null;
    this.isDisabled = true;

    if (this.isSignIn) {
      if (this.authService.validateUser(this.username, this.password)) {
        this.authService.setLoginStatus(true);
        this.router.navigate(['']);
      } else {
        this.errorMsg = 'Invalid username or password';
        this.isDisabled = false;
      }
    } else {
      if (this.password !== this.confirmPassword) {
        this.errorMsg = 'Confirm password does not match with the password';
        this.isDisabled = false;
      } else if (this.authService.createUser(this.username, this.password)) {
        this.authService.setLoginStatus(true);
        this.router.navigate(['']);
      } else {
        this.errorMsg = 'Username exists. Please try with another username';
        this.isDisabled = false;
      }
    }
  }

  public toggleLogin(): void {
    if (!this.isDisabled) {
      this.isSignIn = !this.isSignIn;
    }
  }
}
