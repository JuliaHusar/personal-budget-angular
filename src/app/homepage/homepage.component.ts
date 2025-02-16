import { AfterViewInit, Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
        {
            data: [] as any[],
            backgroundColor: [
               '#ffcd56',
               '#ff6384',
               '#36a2eb',
               '#fd6b19',
                '#23d160',
                '#ff0000',
                '#0000ff',
                '#00ff00',
            ],
        }
    ],
    labels: [] as any[]
  };

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    const el = document.getElementById('myChart');
    console.log('Element: ', el);
      this.http.get('http://localhost:3000/budget')
        .subscribe((res: any) => {
          for (var i = 0; i < res.myBudget.length; i++) {
            this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
            this.dataSource.labels[i] = res.myBudget[i].title;
          }
          this.createChart();
        });
  }

  createChart() {
      var ctx = document.getElementById("myChart") as HTMLCanvasElement | null;
      if (ctx) {
        var myPieChart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      } else {
        console.error('Failed to get the context of the chart element');
      }
  }
}
