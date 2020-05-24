import {
  EventEmitter,
  Component,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Class } from 'src/app/entities/class';

export interface FilterObj {
  class?: string;
  student?: string;
  fromDate?: Date;
  toDate?: Date;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnChanges {
  @Input() classes: Class[];
  @Output() filterChange = new EventEmitter();

  public viewClasses: string[];
  public viewStudents: string[];

  public selectedClass;
  public selectedStudent;
  public selectedStartDate;
  public selectedEndDate;

  private classMap = {};

  ngOnChanges(): void {
    const viewClasses = [undefined];
    this.classes?.map((cls) => {
      viewClasses.push(cls.name);

      if (!this.classMap[cls.name]) {
        this.classMap[cls.name] = [undefined];
      }
      this.classMap[cls.name].push(cls.students);
    });
    this.viewClasses = viewClasses;
  }

  public handleStartDateChange(e: any): void {
    this.selectedStartDate = e.target.value;
    this.filtersChanged();
  }

  public handleEndDateChange(e: any): void {
    this.selectedEndDate = e.target.value;
    this.filtersChanged();
  }

  public handleClassChange(e: any): void {
    this.selectedClass = e.value;
    this.viewStudents = this.classMap[e.value];
    this.filtersChanged();
  }

  public handleStudentChange(e: any): void {
    this.selectedStudent = e.value;
    this.filtersChanged();
  }

  public filtersChanged(): void {
    const filterObj: FilterObj = {
      class: this.selectedClass,
      student: this.selectedStudent,
      fromDate: this.selectedStartDate,
      toDate: this.selectedEndDate,
    };
    this.filterChange.emit(filterObj);
  }
}
