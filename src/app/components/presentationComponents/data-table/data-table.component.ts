import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Activity } from 'src/app/interfaces/Activity';
import { Class } from 'src/app/interfaces/class';
import { DataSource } from '@angular/cdk/collections/data-source';
import { Filter } from 'src/app/interfaces/filter';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input() activities: Activity[];
  @Input() classes: Class[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public dataSource;
  public displayedColumns = [
    'student',
    'week',
    'content',
    'type',
    'skill',
    'value',
    'time',
  ];

  public handleFilterChange(e): void {
    this.dataSource.filter = e;
  }

  public assesmentCategory(marks: number): object {
    return {
      excellent: marks >= 90,
      good: 90 > marks && marks >= 80,
      ok: 80 > marks && marks >= 60,
      weak: 60 > marks,
    };
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.activities);
    this.dataSource.sort = this.sort;
    this.setFilterPredicate();
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
            propMatched =
              this.getDate(rowData.week).getTime() > filterVal.getTime();
          } else if (filterKey === 'toDate') {
            propMatched =
              this.getDate(rowData.week).getTime() < filterVal.getTime();
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

  private getDate(dat: string): Date {
    // Convert week into standard format and return as Date object
    const arr = dat.split('/');
    return new Date(`${arr[1]}/${arr[0]}/${arr[2]}`);
  }
}
