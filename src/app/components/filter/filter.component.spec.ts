import { TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
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
  const mockDate = '01/01/2020';

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

  it('should generate the default Class array', () => {
    const arr = [undefined, ...mockDataStore.classes.map((cls) => cls.name)];
    expect(comp.viewClasses).toEqual(arr);
  });

  it('should generate the default Student array as empty', () => {
    expect(comp.viewStudents).toEqual(undefined);
  });

  it('should handle class change to generate students list and emit an event', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleClassChange({ value: mockDataStore.getClasses()[0].name });

    expect(comp.selectedClass).toEqual(mockDataStore.getClasses()[0].name);
    expect(comp.viewStudents).toEqual([
      undefined,
      mockDataStore.getClasses()[0].students[0],
    ]);
    expect(comp.filterChange.emit).toHaveBeenCalledWith({
      class: mockDataStore.getClasses()[0].name,
      student: undefined,
      fromDate: undefined,
      toDate: undefined,
    });
  });

  it('should handle student change to set the status and emit an event', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleStudentChange({
      value: mockDataStore.getClasses()[0].students[0],
    });

    expect(comp.selectedStudent).toEqual(
      mockDataStore.getClasses()[0].students[0]
    );
    expect(comp.filterChange.emit).toHaveBeenCalledWith({
      class: undefined,
      student: mockDataStore.getClasses()[0].students[0],
      fromDate: undefined,
      toDate: undefined,
    });
  });

  it('should handle start date change to set the status and emit an event', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleStartDateChange({ target: { value: mockDate } });

    expect(comp.selectedStartDate).toEqual(mockDate);
    expect(comp.filterChange.emit).toHaveBeenCalledWith({
      class: undefined,
      student: undefined,
      fromDate: mockDate,
      toDate: undefined,
    });
  });

  it('should handle end date change to set the status and emit an event', () => {
    spyOn(comp.filterChange, 'emit');
    comp.handleEndDateChange({ target: { value: mockDate } });

    expect(comp.selectedEndDate).toEqual(mockDate);
    expect(comp.filterChange.emit).toHaveBeenCalledWith({
      class: undefined,
      student: undefined,
      fromDate: undefined,
      toDate: mockDate,
    });
  });
});
