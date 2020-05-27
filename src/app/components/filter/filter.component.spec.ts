import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { ActivityResponse } from 'src/app/interfaces/activity-response';
import { ClassesResponse } from 'src/app/interfaces/classes-response';
import { Activity } from 'src/app/interfaces/Activity';
import { Class } from 'src/app/interfaces/class';
import { DataStore } from 'src/app/services/data-store.service';

class MockDataStore {
  public activities: Activity[];
  public classes: Class[] = [
    { name: 'class_1', students: ['student_1'] },
    { name: 'class_2', students: ['student_2'] },
  ];

  public getActivities(): Activity[] {
    return this.activities;
  }

  public getClasses(): Class[] {
    return this.classes;
  }
}

describe('FilterComponent', () => {
  let comp: FilterComponent;
  let dataStore: DataStore;
  let mockDataStore: MockDataStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterComponent,
        { provide: DataStore, useClass: MockDataStore },
      ],
    });
    comp = TestBed.inject(FilterComponent);
    dataStore = TestBed.inject(DataStore);
    mockDataStore = new MockDataStore();
  });

  it('should be instantiated', () => {
    expect(comp).toBeTruthy();
  });

  it('should generatecdefault Class array', () => {
    const arr = [undefined, ...mockDataStore.classes.map((cls) => cls.name)];
    expect(comp.viewClasses).toEqual(arr);
  });

  it('should generate default Student array as empty', () => {
    const arr = [undefined, 'class_1'];
    expect(comp.viewStudents).toEqual(undefined);
  });

  it('handle class change and generate students list', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleClassChange({ value: 'class_1' });

    expect(comp.selectedClass).toEqual('class_1');
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
