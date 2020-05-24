import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Activity } from 'src/app/interfaces/Activity';
import { Class } from 'src/app/interfaces/class';
import { Filter } from 'src/app/interfaces/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public activities: Activity[];
  public classes: Class[];
  public filter: Filter;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private async fetchData(): Promise<void> {
    try {
      const classesResponse = await this.dataService.getClasses();
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

      const activitiesResponse = await this.dataService.getActivities();

      const acts: Activity[] = [];
      activitiesResponse.data.map((activity) => {
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
    } catch (error) {
      console.error(error);
    }
  }
}
