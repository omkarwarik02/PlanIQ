import { Injectable } from '@angular/core';
import { Subject } from '../../models/subject.model';
@Injectable({
  providedIn: 'root',
})
export class Subjects {
  subjects: Subject[] = [];

  constructor(){
    const data = localStorage.getItem('subjects');
    this.subjects = data ? JSON.parse(data) : [];
  }
  

  addSubject(subject:Subject){
    this.subjects.push(subject);
    localStorage.setItem('subjects',JSON.stringify(this.subjects))
  }

  getSubject():Subject[]{
    const data = localStorage.getItem('subjects');
    return data ? JSON.parse(data) : [];
  }
}
