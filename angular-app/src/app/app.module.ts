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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyDoughnutChartComponent } from './my-doughnut-chart/my-doughnut-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';


import { PatientComponent } from './Patient/Patient.component';
import { MedicineComponent } from './Medicine/Medicine.component';
import { POComponent } from './PO/PO.component';
import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';

import { DoctorComponent } from './Doctor/Doctor.component';
import { ManufacturerComponent } from './Manufacturer/Manufacturer.component';
import { DistributorComponent } from './Distributor/Distributor.component';
import { HospitalComponent } from './Hospital/Hospital.component';
import { ChartsModule } from 'ng2-charts';

import { MoveProductComponent } from './MoveProduct/MoveProduct.component';
import { InitiatePOComponent } from './InitiatePO/InitiatePO.component';
import { TransferCommodityComponent } from './TransferCommodity/TransferCommodity.component';
import { TransferCommodityHospitalComponent } from './TransferCommodityHospital/TransferCommodityHospital.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyDoughnutChartComponent,
    JumbotronComponent,
    MyPieChartComponent,
    PatientComponent,
    MyBarChartComponent,
    AllTransactionsComponent,
    AboutComponent,
    MedicineComponent,
    POComponent,
    DoctorComponent,
    ManufacturerComponent,
    DistributorComponent,
    HospitalComponent,
    MoveProductComponent,
    InitiatePOComponent,
    TransferCommodityComponent,
    TransferCommodityHospitalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
