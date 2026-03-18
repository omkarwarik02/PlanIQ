import { Component,OnInit,inject } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subjects } from '../../../core/services/subject';

@Component({
  selector: 'app-add-subject',
  imports: [MatCardModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule],
  templateUrl: './add-subject.html',
  styleUrl: './add-subject.scss',
})
export class AddSubject implements OnInit {

  subjects:any[] = [];
  private subjectService = inject(Subjects)
  private fb = inject(FormBuilder);

  subjectForm!:FormGroup;

  ngOnInit(): void {

    this.subjectForm = this.fb.group({
      subjectName: [''],
      difficulty:[''],
      hoursPerDay:['']
    })
      this.subjects = this.subjectService.getSubject();
  }
  
  addSubjects(){
    const newSubject = this.subjectForm.value;
    this.subjectService.addSubject(newSubject);
    this.subjectForm.reset();
  }

}
