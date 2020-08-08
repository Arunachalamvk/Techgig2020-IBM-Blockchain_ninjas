import { Component, OnInit } from '@angular/core';
import { PatientService } from '../Patient/Patient.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css'],
  providers: [PatientService]
})
export class JumbotronComponent implements OnInit {
  private errorMessage;
  location:Array<any>;
  public patient:Array<any>=[];

  constructor(public servicePatient: PatientService) { }
    loadPatient(){
      const tempList = [];
    this.location = [];
   
    
    

    return this.servicePatient.getAll()
    .toPromise()
    .then((result) => {
      for (let entry of result) {
        this.patient.push(entry.patientId);
        this.location.push(entry.location);
      }
      console.log(this.patient);

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
  
    
  
  total=300;
  active=200;
  recovered=198;
  death=2;

  val:any = [{dis:"karur",count:1},{dis:"salem",count:2},{dis:"salem",count:2}];


  tabhead:any = ['District', 'Count'];
 
  ngOnInit() {
    this.loadPatient();
  }

}