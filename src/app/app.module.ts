import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FilterComponent } from './components/filter/filter.component';
import { ResultsChartComponent } from './components/results-chart/results-chart.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './components/base/base.component';
import { MaterialModule } from './modules/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { DataStore } from './services/data-store.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ResultsChartComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    BaseComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [AuthService, DataService, DataStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
