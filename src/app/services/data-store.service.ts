import { Injectable } from '@angular/core';
import { Class } from '../interfaces/class';
import { Activity } from '../interfaces/Activity';
import { ActivityResponse } from '../interfaces/activity-response';
import { ClassesResponse } from '../interfaces/classes-response';

@Injectable()
export class DataStore {
  private activities: Activity[];
  private classes: Class[];

  public setData(
    activityResponse: ActivityResponse,
    classesResponse: ClassesResponse
  ): void {
    this.classes = classesResponse.classes;

    const studentClassMap = {};
    this.classes?.forEach((cls) => {
      cls.students.forEach((student) => {
        if (!studentClassMap[student]) {
          studentClassMap[student] = [];
        }
        studentClassMap[student].push(cls.name);
      });
    });

    const acts: Activity[] = [];
    activityResponse.data.map((activity) => {
      activity.attempts.weeks.forEach((week, idx) => {
        const act: Activity = {
          student: activity.student,
          content: activity.content,
          skill: activity.skill,
          time: activity.time,
          type: activity.type,
          week,
          value: activity.attempts.values[idx],
          class: studentClassMap[activity.student],
        };
        acts.push(act);
      });
    });
    this.activities = acts;
  }

  public getActivities(): Activity[] {
    return this.activities;
  }

  public getClasses(): Class[] {
    return this.classes;
  }
}
