import { Injectable } from '@angular/core';
import { SubjectModel } from '../../interface/subject.model';

@Injectable({
  providedIn: 'root',
})
export class Subject {
  private storageKey = 'subjects';

  subjects:SubjectModel[] = [];

  constructor(){
    const data = localStorage.getItem(this.storageKey);
    this.subjects = data ? JSON.parse(data) : []
  }

  addSubject(subject:any){
    this.subjects.push(subject);
    this.saveToStorage
  }
  getSUbjects(){
    return this.subjects;
  }
  deleteSubject(index:number){
    this.subjects.splice(index,1);
    this.saveToStorage()
  }

  private saveToStorage(){
    localStorage.setItem(this.storageKey,JSON.stringify(this.subjects))
  }
}
