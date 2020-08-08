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
import { HospitalService } from './Hospital.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-hospital',
  templateUrl: './Hospital.component.html',
  styleUrls: ['./Hospital.component.css'],
  providers: [HospitalService]
})
export class HospitalComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  private require;

  approvalId = new FormControl('', Validators.required);
  hospitalName = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  requirements = new FormControl('', Validators.required);


  constructor(public serviceHospital: HospitalService, fb: FormBuilder) {
    this.myForm = fb.group({
      approvalId: this.approvalId,
      hospitalName: this.hospitalName,
      location: this.location,
      quantity: this.quantity,
      requirements: this.requirements
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHospital.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    if(this.quantity.value >=1000){
      this.require=20;
    }else if(this.quantity.value >=500 && this.quantity.value <=1000){
      this.require=40;
    }else if(this.quantity.value <=500){
      this.require=60;
    }
    else if(this.quantity.value <=200){
      this.require=80;
    }
    else {
      this.require=90;
    }
    this.participant = {
      $class: 'org.hyperledger_composer.scms.Hospital',
      'approvalId': this.approvalId.value,
      'hospitalName': this.hospitalName.value,
      'location': this.location.value,
      'quantity': 0,
      'requirements': this.require
    };

    this.myForm.setValue({
      'approvalId': null,
      'hospitalName': null,
      'location': null,
      'quantity': null,
      'requirements': null
    });

    return this.serviceHospital.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'approvalId': null,
        'hospitalName': null,
        'location': null,
        'quantity': null,
        'requirements': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.hyperledger_composer.scms.Hospital',
      'hospitalName': this.hospitalName.value,
      'location': this.location.value,
      'quantity': this.quantity.value,
      'requirements': this.requirements.value
    };

    return this.serviceHospital.updateParticipant(form.get('approvalId').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceHospital.deleteParticipant(this.currentId)
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

    return this.serviceHospital.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'approvalId': null,
        'hospitalName': null,
        'location': null,
        'quantity': null,
        'requirements': null
      };

      if (result.approvalId) {
        formObject.approvalId = result.approvalId;
      } else {
        formObject.approvalId = null;
      }

      if (result.hospitalName) {
        formObject.hospitalName = result.hospitalName;
      } else {
        formObject.hospitalName = null;
      }

      if (result.location) {
        formObject.location = result.location;
      } else {
        formObject.location = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.requirements) {
        formObject.requirements = result.requirements;
      } else {
        formObject.requirements = null;
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
      'approvalId': null,
      'hospitalName': null,
      'location': null,
      'quantity': null,
      'requirements': null
    });
  }
}
