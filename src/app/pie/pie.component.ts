import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as d3 from 'd3';

@Component({
  selector: 'pb-pie',
  standalone: true,
  imports: [],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss'
})
export class PieComponent implements OnInit {

  data: any = {};
  transformedData: any[] = [];

  constructor(private dataService: DataService) {}

  private svg: any;
  private margin = 50;
  private width = 960;
  private height = 450;
  private radius = Math.min(this.width, this.height) / 2;
  private colors: any;

  private createSVG(): void {
    console.log('Creating SVG...');
    this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
      
    this.svg.append("g").attr("class", "slices");
    this.svg.append("g").attr("class", "labels");
    this.svg.append("g").attr("class", "lines");
  }

  private createColors(): void {
    const keys = this.transformedData.map((d: any) => d.key);
    console.log('Keys:', keys);
    this.colors = d3.scaleOrdinal()
      .domain(keys)
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    }

  private midAngle(d: any): number {
    return d.startAngle + (d.endAngle - d.startAngle)/2;
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.value));
    const arc = d3.arc().innerRadius(this.radius * 0.4).outerRadius(this.radius * 0.8);
    const outerArc = d3.arc().innerRadius(this.radius * 0.9).outerRadius(this.radius * 0.9);

    const key = (d: any) => d.data.key;

    const slice = this.svg.select(".slices")
      .selectAll("path.slice")
      .data(pie(this.transformedData))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => this.colors(d.data.key))
      .attr("class", "slice");

    const text = this.svg.select(".labels")
      .selectAll("text")
      .data(pie(this.transformedData))
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .text((d: any) => d.data.key)
      .attr("transform", (d: any) => {
        const pos = outerArc.centroid(d);
        pos[0] = this.radius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1); // Adjusted label position
        return "translate(" + pos + ")";
      })
      .style("text-anchor", (d: any) => this.midAngle(d) < Math.PI ? "start" : "end");

    const polyline = this.svg.select(".lines")
      .selectAll("polyline")
      .data(pie(this.transformedData))
      .enter()
      .append("polyline")
      .attr("points", (d: any) => {
        const pos = outerArc.centroid(d);
        pos[0] = this.radius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1); // Adjusted polyline position
        return [arc.centroid(d), outerArc.centroid(d), pos];
      })
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "1px");
  }

  ngOnInit(): void {
    this.dataService.getBudgetData().then((data: any) => {
      console.log('Data received from backend:', data);
      this.data = data;
      this.transformedData = Object.keys(data).map(key => ({ key: key, value: data[key] }));
      console.log('Transformed Data:', this.transformedData);
      this.createSVG();
      this.createColors();
      this.drawChart();
    });
  }
}
