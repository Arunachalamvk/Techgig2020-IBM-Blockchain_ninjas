import { Component, OnInit } from '@angular/core';
import { PatientService } from '../Patient/Patient.service';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css'],
  providers: [PatientService]
})
export class MyBarChartComponent implements OnInit { 
  private errorMessage;
  public coimb;
  constructor(public servicePatient: PatientService) { }
  displayChartData:Array<number>=[]; 
  location:Array<number>= [];
  loadPatient(){
    const tempList = [];
    return this.servicePatient.getAll()
    .toPromise()
    .then((result) => {
      for (let entry of result) {
        this.location.push(entry.location);
      }
      function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }
      console.log(this.location);
      this.coimb = (getOccurrence(this.location, "Coimbatore"));
     this.coimb = 80;
      let a =[];
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });

  }

  
  
  //Actual Data Set - This is the format you should get the Data to display in the chart
   chartdata:Array<any>=[
  
    {
      "PatientCount":"55",
      "PatientLocation":"Coimbatore",

    },
    {
      "PatientCount":"40",
      "PatientLocation":"Villupuram",
 
    },
    {
      "PatientCount":"20",
      "PatientLocation":"Karur",

    },
    {
      "PatientCount":"70",
      "PatientLocation":"Theni",

    },
    {
      "PatientCount":"100",
      "PatientLocation":"Coimbatore",

    },
    {
      "PatientCount":"150",
      "PatientLocation":"chennai",

    },
    {
      "PatientCount":"65",
      "PatientLocation":"Salem",
    }
    ]

//Data To Be Displayed 
   

  

// Options To Show all the Data - from displayChartData (mandatory)
public barChartOptions = {
  scaleShowValues: true,
  scales: {
  yAxes: [{
  ticks: {
  beginAtZero: true
  }
  }],
  xAxes: [{
  ticks: {
  autoSkip: false
  }
  }]
  }
  }
  
  
  public barChartLabels = [];
  public barChartType = 'bar';
  // public barChartLegend = true;  
  
  // public barChartData = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  // ];  
  
  ngOnInit() {
    this.loadPatient();
    console.log(this.coimb);

//forEach the data and display - numeric data & labels to the array
this.chartdata.forEach(element=>{
  this.displayChartData.push(element.PatientCount);
  this.barChartLabels.push(element.PatientLocation)
})


  }


}