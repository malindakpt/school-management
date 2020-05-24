import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Activity } from 'src/app/interfaces/Activity';
import { Class } from 'src/app/interfaces/class';
import { Filter } from 'src/app/interfaces/filter';
import { DataStore } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public activities: Activity[];
  public classes: Class[];
  public dataSource;
  public filterCriteriaText = '';
  public displayedColumns = [
    'student',
    'week',
    'content',
    'type',
    'skill',
    'value',
    'time',
  ];

  constructor(dataStore: DataStore) {
    this.activities = dataStore.getActivities();
    this.classes = dataStore.getClasses();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.activities);
    this.dataSource.sort = this.sort;
    this.setFilterPredicate();
  }

  public handleFilterChange(filter: Filter): void {
    // Generate the no data message
    const student = filter.student ? ` by ${filter.student}` : '';
    const from = filter.fromDate
      ? ` from ${filter.fromDate.toDateString()}`
      : '';
    const to = filter.toDate ? ` to ${filter.toDate.toDateString()}` : '';
    this.filterCriteriaText = `${student}${from}${to}`;

    // Set the filter
    this.dataSource.filter = filter;
  }

  public getAssesmentCategory(marks: number): string {
    if (marks >= 90) {
      return 'excellent';
    } else if (marks >= 80) {
      return 'good';
    } else if (marks >= 60) {
      return 'ok';
    } else {
      return 'weak';
    }
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (rowData: Activity, filter: Filter) => {
      let allPropsMatched = true;
      for (const entry of Object.entries(filter)) {
        // Iterate for each attribute of filter
        let propMatched = false;
        const filterKey = entry[0];
        const filterVal = entry[1];

        // if filter value is unavailable, then skip the validation
        if (filterVal) {
          if (filterKey === 'fromDate') {
            propMatched = rowData.week.getTime() > filterVal.getTime();
          } else if (filterKey === 'toDate') {
            propMatched = rowData.week.getTime() < filterVal.getTime();
          } else if (rowData[filterKey] instanceof Array) {
            // if row data contains an array, then find if any value of array match with filter value
            for (const ele of rowData[filterKey]) {
              if (ele === filterVal) {
                propMatched = true;
                break;
              }
            }
          } else if (rowData[filterKey] === filterVal) {
            propMatched = true;
          }
          // validating whether all the attributes in  filter should match with row data
          allPropsMatched = allPropsMatched && propMatched;
        }
      }
      return allPropsMatched;
    };
  }
}
