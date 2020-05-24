import { Component, Input, OnChanges } from '@angular/core';
import { Activity } from 'src/app/interfaces/Activity';

@Component({
  selector: 'app-results-chart',
  templateUrl: './results-chart.component.html',
  styleUrls: ['./results-chart.component.scss'],
})
export class ResultsChartComponent implements OnChanges {
  public populationArr = ['0%', '0%', '0%', '0%'];
  public legendArr = ['Weak', 'Ok', 'Good', 'Excellent'];
  @Input() dataSource: Activity[];
  @Input() criteria: string;

  ngOnChanges(): void {
    if (this.dataSource?.length > 0) {
      const population = [0, 0, 0, 0];
      const total = this.dataSource.length;

      for (const activity of this.dataSource) {
        if (activity.value >= 90) {
          population[3]++;
        } else if (activity.value >= 80) {
          population[2]++;
        } else if (activity.value >= 60) {
          population[1]++;
        } else {
          population[0]++;
        }
      }

      this.populationArr = population.map(
        (count) => `${Math.floor((count * 100) / total)}%`
      );
    }
  }
}
