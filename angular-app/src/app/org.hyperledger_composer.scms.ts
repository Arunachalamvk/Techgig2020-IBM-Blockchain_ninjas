import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// import {Participant} from './org.hyperledger.composer.system';
// export namespace org.hyperledger_composer.scms{
   export enum Ailments {
      Bloodpressure,
      Cardio,
      pneumonia,
      TB,
      Cancer,
      Diabetes,
   }
   export enum Symptoms {
      Drycough,
      Fever,
      Headache,
   }
   export enum Location {
      Chennai,
      Coimbatore,
      Salem,
      Kanchipuram,
      Theni,
      Karur,
      Tiruppur,
      Nilgris,
      Dharmapuri,
      Villupuram,
   }
   export enum Status {
      Testing,
      Negative,
      Positive,
   }
   export enum Specialization {
      Heartsurgeon,
      Pulmonology,
      Diabetology,
      Ent,
      Pediatric,
   }
   export enum Remarks {
      Testing,
      Hospitalized,
      Selfquarantined,
   }
   export enum OrderStatus {
      INITIATED,
      CONFIRMED,
      DELIVERING,
      DELIVERED,
   }
   export class Trace {
      timestamp: Date;
      company: Participant;
   }
   export class Patient extends Asset {
      patientId: string;
      name: string;
      contactno: number;
      location: Location;
      symptoms: Symptoms[];
      ailments: Ailments[];
      link: string;
      hospital: Participant;
      doctor: Participant;
      status: Status;
      remarks: Remarks;
      date: Date;
      day: number;
   }
   export class Medicine extends Asset {
      medicineid: string;
      name: string;
      description: string;
      quantity: number;
      trace: Trace[];
      owner: Participant;
      issuer: Participant;
   }
   export class PO extends Asset {
      orderid: string;
      medicineid: Medicine;
      orderStatus: OrderStatus;
      orderer: Participant;
      vendor: Participant;
   }
   export class Doctor extends Participant {
      doctorId: string;
      Name: string;
      specialization: Specialization;
      hospital: Participant;
   }
   export class Manufacturer extends Participant {
      manufacturerId: string;
      Name: string;
      location: Location;
   }
   export class Distributor extends Participant {
      distributorId: string;
      Name: string;
      location: Location;
   }
   export class Hospital extends Participant {
      approvalId: string;
      hospitalName: string;
      location: Location;
      quantity: number;
      requirements: number;
   }
   export class MoveProduct extends Transaction {
      patient: Patient;
      status: Status;
      remarks: Remarks;
      date: Date;
   }
   export class InitiatePO extends Transaction {
      orderId: string;
      medicineid: Medicine;
      orderer: Participant;
      vendor: Participant;
   }
   export class TransferCommodity extends Transaction {
      commodity: Medicine;
      quantity: number;
      issuer: Participant;
      newOwner: Participant;
   }
   export class TransferCommodityHospital extends Transaction {
      commodity: Medicine;
      hospital: Hospital;
      quantity: number;
      issuer: Participant;
      newOwner: Participant;
   }
// }
