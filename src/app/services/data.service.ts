import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClassesResponse } from '../interfaces/classes-response';
import { ActivityResponse } from '../interfaces/activity-response';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public getClasses(): Promise<ClassesResponse> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.classesURL).subscribe(
        (result: ClassesResponse) => {
          resolve(result);
        },
        (error) => {
          // TODO display a proper error message
          console.error(error);
          resolve({ classes: [] });
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
          // TODO display a proper error message
          console.error(error);
          resolve({ data: [] });
        }
      );
    });
  }
}
