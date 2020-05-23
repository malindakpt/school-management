import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface ClassesResponse {
  classes: [];
}
interface ActivityResponse {
  data: [];
}

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public getClasses() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.classesURL).subscribe(
        (reslut: ClassesResponse) => {
          resolve(reslut.classes);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  public getActivities() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.activitiesURL).subscribe(
        (reslut: ActivityResponse) => {
          resolve(reslut.data);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }
}
