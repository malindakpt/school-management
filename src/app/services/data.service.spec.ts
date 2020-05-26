import { DataService } from './data.service';
import { ClassesResponse } from '../interfaces/classes-response';

import { ActivityResponse } from '../interfaces/activity-response';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'protractor';
import { of } from 'rxjs/internal/observable/of';

let httpClientSpy: { get: jasmine.Spy };
let dataService: DataService;

beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  dataService = new DataService(<any>httpClientSpy);
});

it('should return expected classes (HttpClient called once)', () => {
  const expectedResponse: ClassesResponse = {
    classes: [
      { name: 'class_1', students: ['A', 'B'] },
      { name: 'class_2', students: ['A', 'B'] },
    ],
  };

  httpClientSpy.get.and.returnValue(of(expectedResponse));

  dataService
    .getClasses()
    .then(
      (classes) => expect(classes).toEqual(expectedResponse, 'expected heroes'),
      fail
    );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});

it('should return expected activities (HttpClient called once)', () => {
  const expectedResponse: ActivityResponse = {
    data: [
      {
        attempts: { weeks: ['1'], values: [80] },
        content: 'content_!',
        skill: 'skill_1',
        student: 'student_1',
        time: 'time_1',
        type: 'type_1',
      },
    ],
  };

  httpClientSpy.get.and.returnValue(of(expectedResponse));

  dataService
    .getActivities()
    .then(
      (activities) =>
        expect(activities).toEqual(expectedResponse, 'expected heroes'),
      fail
    );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});

it('should return an error when the server returns a 404', () => {
  httpClientSpy.get.and.throwError('test 404 error');

  dataService
    .getClasses()
    .then((classes) => fail('expected an error, not heroes'))
    .catch((error) => expect(error.message).toContain('test 404 error'));
});

it('should return an error when the server returns a 404', () => {
  httpClientSpy.get.and.throwError('test 404 error');

  dataService
    .getActivities()
    .then((classes) => fail('expected an error, not heroes'))
    .catch((error) => expect(error.message).toContain('test 404 error'));
});
