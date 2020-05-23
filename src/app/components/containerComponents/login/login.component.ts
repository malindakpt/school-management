import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/services/authGuard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authGuard: AuthGuard, private router: Router) {}

  ngOnInit(): void {}

  public login() {
    this.authGuard.setLoginStatus(true);
    this.router.navigate(['']);
  }
}
