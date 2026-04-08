import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgForOf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddsubService } from '../../../services/addsub.service';


@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ButtonModule, CommonModule, DialogModule, FormsModule, InputNumberModule],
  templateUrl: './add-subject.html',
  styleUrl: './add-subject.scss'
})
export class AddSubject implements OnInit {

  subjectService = inject(AddsubService)
  
  ngOnInit() {
    this.subjectService.getSubjects().subscribe({
      error: (err) => console.error('Failed to load subjects:', err)
    });
  }

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
  if(!this.subject.name || !this.subject.difficulty || !this.subject.hours)return;
  this.subjectService.addSubject({...this.subject}).subscribe({
    next:()=>{
      this.subject = { name: '', difficulty: null, hours: null };
      console.log(this.subject);
       this.displayDialog = false;
    },
    error:(err)=>{
        console.error('Failed to save subject:', err);
    }
  })
 
 }
 deleteSubject(id:string){
  this.subjectService.deleteSub(id).subscribe({
    next: () => console.log('Subject deleted'),
    error: (err) => console.error('Failed to delete subject:', err)
  });
 }
 
}