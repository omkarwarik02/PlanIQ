import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

interface Subject {
  name: string;
  difficulty: string;
  hoursPerDay: number;
}

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ButtonModule],
  templateUrl: './add-subject.html',
  styleUrl: './add-subject.scss'
})
export class AddSubject implements OnInit {

  private fb = inject(FormBuilder);

  subjectForm!: FormGroup;

  subjects: Subject[] = [];

  difficultyOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' }
  ];

  ngOnInit(): void {
    this.subjectForm = this.fb.group({
      subjectName: ['', Validators.required],
      difficulty: [null, Validators.required],
      hoursPerDay: [null, Validators.required]
    });
  }

  addSubject() {
    if (this.subjectForm.valid) {
      const newSubject: Subject = {
        name: this.subjectForm.value.subjectName,
        difficulty: this.subjectForm.value.difficulty,
        hoursPerDay: this.subjectForm.value.hoursPerDay
      };

      this.subjects.push(newSubject);

      console.log(this.subjects);

      this.subjectForm.reset();
    }
  }
}