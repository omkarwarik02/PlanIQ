import { inject, Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubjectModel } from '../interface/subject.model';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AddsubService {
  private API_URL = 'http://localhost:3000';
  private http = inject(HttpClient);



subjects = signal<SubjectModel[]>([]);


  addSubject(subject:SubjectModel) {
    return this.http.post<{message:String;subject:SubjectModel}>(`${this.API_URL}/api/subjects/add`, subject).pipe(
      tap((res)=>{
        this.subjects.update(current=>[...current,res.subject]);
      })
    );
  }

  getSubjects(){
  return this.http.get<{subjects:SubjectModel[]}>(`${this.API_URL}/api/subjects-list/get`).pipe(
      tap((response) => this.subjects.set( response.subjects)) 
    )
  }
}