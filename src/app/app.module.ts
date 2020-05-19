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

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    FilterComponent,
    ResultsChartComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
