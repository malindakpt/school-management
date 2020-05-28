import { DataService } from './data.service';
import { ClassesResponse } from '../interfaces/classes-response';
import { ActivityResponse } from '../interfaces/activity-response';
import { of } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy };
let dataService: DataService;

describe('DataService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    dataService = new DataService(httpClientSpy as any);
  });

  it('should return expected Class list (HttpClient called once)', () => {
    const mockClassListResponse: ClassesResponse = {
      classes: [
        { name: 'class_1', students: ['A', 'B'] },
        { name: 'class_2', students: ['C', 'D'] },
        { name: 'class_3', students: ['E', 'F'] },
      ],
    };

    httpClientSpy.get.and.returnValue(of(mockClassListResponse));

    dataService
      .getClasses()
      .then((classes) =>
        expect(classes).toEqual(mockClassListResponse, 'mock Class list')
      )
      .catch(() => fail('not expected an error'));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected Activity list (HttpClient called once)', () => {
    const mockActivityResponse: ActivityResponse = {
      data: [
        {
          attempts: { weeks: ['1'], values: [80] },
          content: 'content_2',
          skill: 'skill_1',
          student: 'student_1',
          time: 'time_1',
          type: 'type_1',
        },
        {
          attempts: { weeks: ['1'], values: [50] },
          content: 'content_2',
          skill: 'skill_2',
          student: 'student_2',
          time: 'time_2',
          type: 'type_2',
        },
      ],
    };

    httpClientSpy.get.and.returnValue(of(mockActivityResponse));

    dataService
      .getActivities()
      .then((activities) =>
        expect(activities).toEqual(mockActivityResponse, 'mock Activity list')
      )
      .catch(() => fail('not expected an error'));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return empty class list when connection to server fails', () => {
    const mockErrorMsg = 'could not process the request';
    httpClientSpy.get.and.throwError(mockErrorMsg);

    dataService
      .getClasses()
      .then((classes) => {
        expect(classes).toEqual({ classes: [] }, 'expected empty data');
      })
      .catch((err) => {
        expect(err.message).toEqual(mockErrorMsg);
      });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return empty activity list when connection to server fails', () => {
    const mockErrorMsg = 'could not process the request';
    httpClientSpy.get.and.throwError(mockErrorMsg);

    dataService
      .getActivities()
      .then((activities) =>
        expect(activities).toEqual({ data: [] }, 'expected empty data')
      )
      .catch((err) => {
        expect(err.message).toEqual(mockErrorMsg);
      });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
