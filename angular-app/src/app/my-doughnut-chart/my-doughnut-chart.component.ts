import { Component, OnInit } from '@angular/core';@Component({
  selector: 'app-my-doughnut-chart',
  templateUrl: './my-doughnut-chart.component.html',
  styleUrls: ['./my-doughnut-chart.component.css']
})
export class MyDoughnutChartComponent implements OnInit {  
  public doughnutChartLabels = ['Chennai', 'Karur', 'Salem', 'Coimbatore','Theni','Villupuram','Kanchipuram'];
  public doughnutChartData = [70, 20, 40, 90,30,40,60];
  public doughnutChartType = 'doughnut';  constructor() { }  
  ngOnInit() {
  }

}