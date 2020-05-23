import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/containerComponents/header/header.component';
import { LoginComponent } from './components/containerComponents/login/login.component';
import { DataTableComponent } from './components/presentationComponents/data-table/data-table.component';
import { FilterComponent } from './components/presentationComponents/filter/filter.component';
import { ResultsChartComponent } from './components/presentationComponents/results-chart/results-chart.component';
import { AuthGuard } from './services/authGuard';
import { HomeComponent } from './components/containerComponents/home/home.component';
import { BaseComponent } from './components/presentationComponents/base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    FilterComponent,
    ResultsChartComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    BaseComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
