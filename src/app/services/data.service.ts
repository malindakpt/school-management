import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClassesResponse } from '../interfaces/classesResponse';
import { ActivityResponse } from '../interfaces/activityResponse';
import { DataStore } from './dataStore.service';

@Injectable()
export class DataService {
  constructor(private http: HttpClient, private dataStore: DataStore) {}

  public getClasses(): Promise<ClassesResponse> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.classesURL).subscribe(
        (result: ClassesResponse) => {
          resolve(result);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  public getActivities(): Promise<ActivityResponse> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.activitiesURL).subscribe(
        (result: ActivityResponse) => {
          resolve(result);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }
}
