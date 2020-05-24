import { Component, Input, OnChanges } from '@angular/core';
import { Activity } from 'src/app/interfaces/Activity';

@Component({
  selector: 'app-results-chart',
  templateUrl: './results-chart.component.html',
  styleUrls: ['./results-chart.component.scss'],
})
export class ResultsChartComponent implements OnChanges {
  @Input() activities: Activity[];
  public populationArr = ['0%', '0%', '0%', '0%'];
  public legendArr = ['Weak', 'Ok', 'Good', 'Excellent'];

  ngOnChanges(): void {
    if (this.activities?.length > 0) {
      const population = [0, 0, 0, 0];
      const total = this.activities.length;

      for (const activity of this.activities) {
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
