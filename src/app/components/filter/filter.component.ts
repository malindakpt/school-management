import { EventEmitter, Component, Output } from '@angular/core';
import { Filter } from 'src/app/interfaces/filter';
import { DataStore } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter();

  public viewClasses: Array<string | undefined>;
  public viewStudents: Array<string | undefined>;

  public selectedClass;
  public selectedStudent;
  public selectedStartDate;
  public selectedEndDate;

  private classMap = {};

  constructor(dataStore: DataStore) {
    const viewClasses = [undefined];
    const classMap = {};

    dataStore.getClasses().forEach((cls) => {
      viewClasses.push(cls.name);
      classMap[cls.name] = [undefined, ...cls.students];
    });

    this.classMap = classMap;
    this.viewClasses = viewClasses;
  }

  public handleClassChange(e: any): void {
    this.selectedClass = e.value;
    this.selectedStudent = undefined;
    this.viewStudents = this.classMap[e.value];
    this.filtersChanged();
  }

  public handleStudentChange(e: any): void {
    this.selectedStudent = e.value;
    this.filtersChanged();
  }

  public handleStartDateChange(e: any): void {
    this.selectedStartDate = e.target.value;
    this.filtersChanged();
  }

  public handleEndDateChange(e: any): void {
    this.selectedEndDate = e.target.value;
    this.filtersChanged();
  }

  public filtersChanged(): void {
    const filterObj: Filter = {
      class: this.selectedClass,
      student: this.selectedStudent,
      fromDate: this.selectedStartDate,
      toDate: this.selectedEndDate,
    };
    this.filterChange.emit(filterObj);
  }
}
