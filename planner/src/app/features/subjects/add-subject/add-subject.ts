import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { NgForOf } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
interface Subject {
  name: string;
  difficulty: string;
  hoursPerDay: number;
}

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ButtonModule, CommonModule, DialogModule, FormsModule, InputNumberModule],
  templateUrl: './add-subject.html',
  styleUrl: './add-subject.scss'
})
export class AddSubject  {
  subjects = [
  {
    name: 'Data Structures',
    description: 'Practice arrays, linked list, trees',
  },
  {
    name: 'DBMS',
    description: 'Learn SQL and normalization',
  },
  {
    name: 'Operating Systems',
    description: 'Process, threads, scheduling',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
  {
    name: 'Computer Networks',
    description: 'OSI model and protocols',
  },
];

displayDialog:boolean = false;

subject={
  name:'',
  difficulty:null,
  hours:null
}

difficultyOption =[
  {label:'Easy',value:'easy'},
   {label:'Medium',value:'medium'},
    {label:'Hard',value:'hard'}
]
 showDialog(){
  this.displayDialog = true;
 }
 saveSubject(){
  console.log(this.subject);
  this.displayDialog = false;
 }
 
}