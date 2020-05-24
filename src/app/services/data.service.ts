import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClassesResponse } from '../interfaces/classesResponse';
import { ActivityResponse } from '../interfaces/activityResponse';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public getClasses(): Promise<ClassesResponse> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.classesURL).subscribe(
        (reslut: ClassesResponse) => {
          resolve(reslut);
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
        (reslut: ActivityResponse) => {
          resolve(reslut);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }
}
