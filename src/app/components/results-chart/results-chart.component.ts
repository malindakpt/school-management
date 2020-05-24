import { Component } from '@angular/core';
import { DataStore } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-results-chart',
  templateUrl: './results-chart.component.html',
  styleUrls: ['./results-chart.component.scss'],
})
export class ResultsChartComponent {
  public populationArr = ['0%', '0%', '0%', '0%'];
  public legendArr = ['Weak', 'Ok', 'Good', 'Excellent'];

  constructor(dataStore: DataStore) {
    const activities = dataStore.getActivities();

    if (activities?.length > 0) {
      const population = [0, 0, 0, 0];
      const total = activities.length;

      for (const activity of activities) {
        if (activity.value >= 90) {
          population[0]++;
        } else if (activity.value >= 80) {
          population[1]++;
        } else if (activity.value >= 60) {
          population[2]++;
        } else {
          population[3]++;
        }
      }

      this.populationArr = population.map(
        (count) => `${Math.round((count * 100) / total)}%`
      );
    }
  }
}
