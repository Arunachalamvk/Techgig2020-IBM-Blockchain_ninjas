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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { PatientComponent } from './Patient/Patient.component';
import { MedicineComponent } from './Medicine/Medicine.component';
import { POComponent } from './PO/PO.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';



import { DoctorComponent } from './Doctor/Doctor.component';
import { ManufacturerComponent } from './Manufacturer/Manufacturer.component';
import { DistributorComponent } from './Distributor/Distributor.component';
import { HospitalComponent } from './Hospital/Hospital.component';
import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';
import { MyDoughnutChartComponent } from './my-doughnut-chart/my-doughnut-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';


import { MoveProductComponent } from './MoveProduct/MoveProduct.component';
import { InitiatePOComponent } from './InitiatePO/InitiatePO.component';
import { TransferCommodityComponent } from './TransferCommodity/TransferCommodity.component';
import { TransferCommodityHospitalComponent } from './TransferCommodityHospital/TransferCommodityHospital.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'About', component: AboutComponent},
  {path: 'bar-chart', component: MyBarChartComponent},
  { path: 'Patient', component: PatientComponent },
  { path: 'Jumbotron', component: JumbotronComponent },
  { path: 'Medicine', component: MedicineComponent },
  { path: 'doughnut-chart', component: MyDoughnutChartComponent },
  { path: 'pie-chart', component: MyPieChartComponent },
  { path: 'PO', component: POComponent },
  { path: 'AllTransactions', component: AllTransactionsComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'Manufacturer', component: ManufacturerComponent },
  { path: 'Distributor', component: DistributorComponent },
  { path: 'Hospital', component: HospitalComponent },
  { path: 'MoveProduct', component: MoveProductComponent },
  { path: 'InitiatePO', component: InitiatePOComponent },
  { path: 'TransferCommodity', component: TransferCommodityComponent },
  { path: 'TransferCommodityHospital', component: TransferCommodityHospitalComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
