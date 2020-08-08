/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PatientService } from './Patient.service';
import { HospitalService } from '../Hospital/Hospital.service';
import { DoctorService } from '../Doctor/Doctor.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-patient',
  templateUrl: './Patient.component.html',
  styleUrls: ['./Patient.component.css'],
  providers: [PatientService,HospitalService,DoctorService]
})
export class PatientComponent implements OnInit {

  myForm: FormGroup;

  private hospitalList;
  private doctorList;
  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  SelectedHospitalID:any;
  SelectedDoctorID:any;

  patientId = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  contactno = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  symptoms = { value: [] };
  ailments = { value: [] };
  link = new FormControl('', Validators.required);
  hospital = new FormControl('', Validators.required);
  doctor = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  remarks = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  day = new FormControl('', Validators.required);
  filteredHospitalList: any;
  filteredDoctorList: any;

  constructor(public servicePatient: PatientService,private serviceHospital: HospitalService,private serviceDoctor: DoctorService, fb: FormBuilder) {
    this.myForm = fb.group({
      patientId: this.patientId,
      name: this.name,
      contactno: this.contactno,
      location: this.location,
      symptoms: this.symptoms,
      ailments: this.ailments,
      link: this.link,
      hospital: this.hospital,
      doctor: this.doctor,
      status: this.status,
      remarks: this.remarks,
      date: this.date,
      day: this.day
    });
  };
  handleChange(evt) {
    console.log(evt.target.value);
  }

  loadDoctor(){
    const tempList = [];
    return this.serviceDoctor.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.doctorList = tempList;
      console.log(this.doctorList);
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
  
  loadHospital(){
    const tempList = [];
    return this.serviceHospital.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.hospitalList = tempList;      
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
  onLocationChange(event){
    let locationName= event.target.value;
     this.filteredHospitalList=this.hospitalList.filter(val=>val.location == locationName);
    console.log(this.filteredHospitalList);

  }
  doctorChange(event){
    console.log(event.target.value);
    this.filteredDoctorList=this.doctorList.filter(val=>val.hospital.split('#')[1] ==this.SelectedHospitalID);
    // this.doctorList.forEach(participant => {
    //   // console.log(participant.hospital.split('#')[1]);
    //   if(participant.hospital.split('#')[1] == this.SelectedHospitalID ){
    //     this.filteredDoctorList = participant;
    console.log(this.filteredDoctorList);
    //   }
    // })
  }

  ngOnInit(): void {
    this.loadAll();
    this.loadHospital();
    this.loadDoctor();
  }

  loadAll(): Promise<any> {
    let patientlist = [];
    
    const tempList = [];
    return this.servicePatient.getAll()
    .toPromise()
    .then((result) => {
      for (let entry of result) {
        patientlist.push(entry.patientId);
        let dat = new Date(entry.date).getTime();
        entry.day = Math.round((new Date().getTime() - dat) /(1000 * 3600 * 24));
        console.log(entry);
    }
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.hyperledger_composer.scms.Patient',
      'patientId': this.patientId.value,
      'name': this.name.value,
      'contactno': this.contactno.value,
      'location': this.location.value,
      'symptoms': this.symptoms.value,
      'ailments': this.ailments.value,
      'link': this.link.value,
      'hospital': this.SelectedHospitalID,
      'doctor': this.SelectedDoctorID,
      'status': "Testing",
      'remarks': "Testing",
      'date': new Date().getTime(),
      'day': 0
    };
    console.log(this.asset);

    this.myForm.setValue({
      'patientId': null,
      'name': null,
      'contactno': null,
      'location': null,
      'symptoms': null,
      'ailments': null,
      'link': null,
      'hospital': null,
      'doctor': null,
      'status': null,
      'remarks': null,
      'date': null,
      'day': null
    });

    return this.servicePatient.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'patientId': null,
        'name': null,
        'contactno': null,
        'location': null,
        'symptoms': null,
        'ailments': null,
        'link': null,
        'hospital': null,
        'doctor': null,
        'status': null,
        'remarks': null,
        'date': null,
        'day': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    if(this.status.value === 'Negative'){
      this.remarks.value.setValue('Selfquarantined');
    }
    if(this.status.value === 'Positive'){
      this.remarks.value.setValue('Hospitalized');
    }
    this.asset = {
      $class: 'org.hyperledger_composer.scms.Patient',
      'name': this.name.value,
      'contactno': this.contactno.value,
      'location': this.location.value,
      'symptoms': this.symptoms.value,
      'ailments': this.ailments.value,
      'link': this.link.value,
      'hospital': this.hospital.value,
      'doctor': this.doctor.value,
      'status': this.status.value,
      'remarks': this.remarks.value,
      'date': this.date.value,
      'day': this.day.value
    };

    return this.servicePatient.updateAsset(form.get('patientId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePatient.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePatient.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'patientId': null,
        'name': null,
        'contactno': null,
        'location': null,
        'symptoms': null,
        'ailments': null,
        'link': null,
        'hospital': null,
        'doctor': null,
        'status': null,
        'remarks': null,
        'date': null,
        'day': null
      };

      if (result.patientId) {
        formObject.patientId = result.patientId;
      } else {
        formObject.patientId = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.contactno) {
        formObject.contactno = result.contactno;
      } else {
        formObject.contactno = null;
      }

      if (result.location) {
        formObject.location = result.location;
      } else {
        formObject.location = null;
      }

      if (result.symptoms) {
        this.symptoms = { value: result.symptoms };
      } else {
        formObject.symptoms = null;
      }

      if (result.ailments) {
        this.ailments = { value: result.ailments };
      } else {
        formObject.ailments = null;
      }

      if (result.link) {
        formObject.link = result.link;
      } else {
        formObject.link = null;
      }

      if (result.hospital) {
        formObject.hospital = result.hospital;
      } else {
        formObject.hospital = null;
      }

      if (result.doctor) {
        formObject.doctor = result.doctor;
      } else {
        formObject.doctor = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.remarks) {
        formObject.remarks = result.remarks;
      } else {
        formObject.remarks = null;
      }

      if (result.date) {
        formObject.date = result.date;
      } else {
        formObject.date = null;
      }

      if (result.day) {
        formObject.day = result.day;
      } else {
        formObject.day = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'patientId': null,
      'name': null,
      'contactno': null,
      'location': null,
      'symptoms': null,
      'ailments': null,
      'link': null,
      'hospital': null,
      'doctor': null,
      'status': null,
      'remarks': null,
      'date': null,
      'day': null
      });
  }

}
