import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { BaseComponent } from './components/base/base.component';
import { HomeComponent } from './components/home/home.component';
import { HomeResolver } from './services/home.resolver';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthService],
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: [HomeResolver],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
