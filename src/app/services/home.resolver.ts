import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from './data.service';
import { DataStore } from './dataStore.service';

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<any> {
  constructor(private dataService: DataService, private dataStore: DataStore) {}

  resolve(): Promise<any> | any {
    return Promise.all([
      this.dataService.getActivities(),
      this.dataService.getClasses(),
    ]).then((result) => {
      this.dataStore.setData(result[0], result[1]);
    });
  }
}
