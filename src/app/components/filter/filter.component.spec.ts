import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { ActivityResponse } from 'src/app/interfaces/activity-response';
import { ClassesResponse } from 'src/app/interfaces/classes-response';
import { Activity } from 'src/app/interfaces/Activity';
import { Class } from 'src/app/interfaces/class';
import { DataStore } from 'src/app/services/data-store.service';

class MockDataStore {
  private activities: Activity[];
  private classes: Class[] = [{ name: 'class_1', students: ['student_1'] }];

  public setData(
    activityResponse: ActivityResponse,
    classesResponse: ClassesResponse
  ): void {}

  public getActivities(): Activity[] {
    return this.activities;
  }

  public getClasses(): Class[] {
    return this.classes;
  }

  // private getDate(dat: string): Date {
  //   // Convert week into standard format and return as Date object
  //   const arr = dat.split('/');
  //   return new Date(`${arr[1]}/${arr[0]}/${arr[2]}`);
  // }
}

describe('FilterComponent', () => {
  let comp: FilterComponent;
  let dataStore: DataStore;
  // let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        FilterComponent,
        { provide: DataStore, useClass: MockDataStore },
      ],
    });
    // inject both the component and the dependent service.
    comp = TestBed.inject(FilterComponent);
    dataStore = TestBed.inject(DataStore);
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('shoult have classes', () => {
    const arr = [undefined, 'class_1'];
    expect(comp.viewClasses).toEqual(arr);
  });

  it('shoult have students', () => {
    const arr = [undefined, 'class_1'];
    expect(comp.viewStudents).toEqual(undefined);
  });

  it('handle class change', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleClassChange({ value: 'class_1' });
    expect(comp.viewStudents).toEqual([undefined, 'student_1']);

    expect(comp.filterChange.emit).toHaveBeenCalledWith({
      class: 'class_1',
      student: undefined,
      fromDate: undefined,
      toDate: undefined,
    });
  });

  it('handle student change', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleStudentChange({ value: 'student_1' });
    expect(comp.selectedStudent).toEqual('student_1');
    expect(comp.filterChange.emit).toHaveBeenCalledWith({
      class: undefined,
      student: 'student_1',
      fromDate: undefined,
      toDate: undefined,
    });
  });

  it('handle start date change', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleStartDateChange({ target: { value: '01/01/2020' } });
    expect(comp.selectedStartDate).toEqual('01/01/2020');
    expect(comp.filterChange.emit).toHaveBeenCalledWith({
      class: undefined,
      student: undefined,
      fromDate: '01/01/2020',
      toDate: undefined,
    });
  });

  it('handle end date change', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleEndDateChange({ target: { value: '01/01/2020' } });
    expect(comp.selectedEndDate).toEqual('01/01/2020');
    expect(comp.filterChange.emit).toHaveBeenCalledWith({
      class: undefined,
      student: undefined,
      fromDate: undefined,
      toDate: '01/01/2020',
    });
  });
});
