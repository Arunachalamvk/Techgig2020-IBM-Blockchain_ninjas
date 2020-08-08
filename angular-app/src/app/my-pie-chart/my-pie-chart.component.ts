import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit {  
  public pieChartLabels = ['Chennai', 'Karur', 'Salem', 'Coimbatore'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';  constructor() { }  ngOnInit() {
  }}