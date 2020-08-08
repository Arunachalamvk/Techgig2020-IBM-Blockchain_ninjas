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
import { MedicineService } from './Medicine.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-medicine',
  templateUrl: './Medicine.component.html',
  styleUrls: ['./Medicine.component.css'],
  providers: [MedicineService]
})
export class MedicineComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  medicineid = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  trace = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  issuer = new FormControl('', Validators.required);

  constructor(public serviceMedicine: MedicineService, fb: FormBuilder) {
    this.myForm = fb.group({
      medicineid: this.medicineid,
      name: this.name,
      description: this.description,
      quantity: this.quantity,
      trace: this.trace,
      owner: this.owner,
      issuer: this.issuer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMedicine.getAll()
    .toPromise()
    .then((result) => {
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
      $class: 'org.hyperledger_composer.scms.Medicine',
      'medicineid': this.medicineid.value,
      'name': this.name.value,
      'description': this.description.value,
      'quantity': this.quantity.value,
      'trace': [
        {
          "$class": "org.hyperledger_composer.scms.Trace",
          "timestamp": "2020-08-07T18:12:49.105Z",
          "company": "resource:org.hyperledger_composer.scms.Distributor#0002"
        }],
      'owner': this.owner.value,
      'issuer': this.issuer.value
    };

    this.myForm.setValue({
      'medicineid': null,
      'name': null,
      'description': null,
      'quantity': null,
      'trace': null,
      'owner': null,
      'issuer': null
    });

    return this.serviceMedicine.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'medicineid': null,
        'name': null,
        'description': null,
        'quantity': null,
        'trace': null,
        'owner': null,
        'issuer': null
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
    this.asset = {
      $class: 'org.hyperledger_composer.scms.Medicine',
      'name': this.name.value,
      'description': this.description.value,
      'quantity': this.quantity.value,
      'trace': this.trace.value,
      'owner': this.owner.value,
      'issuer': this.issuer.value
    };

    return this.serviceMedicine.updateAsset(form.get('medicineid').value, this.asset)
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

    return this.serviceMedicine.deleteAsset(this.currentId)
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

    return this.serviceMedicine.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'medicineid': null,
        'name': null,
        'description': null,
        'quantity': null,
        'trace': null,
        'owner': null,
        'issuer': null
      };

      if (result.medicineid) {
        formObject.medicineid = result.medicineid;
      } else {
        formObject.medicineid = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.trace) {
        formObject.trace = result.trace;
      } else {
        formObject.trace = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.issuer) {
        formObject.issuer = result.issuer;
      } else {
        formObject.issuer = null;
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
      'medicineid': null,
      'name': null,
      'description': null,
      'quantity': null,
      'trace': null,
      'owner': null,
      'issuer': null
      });
  }

}
