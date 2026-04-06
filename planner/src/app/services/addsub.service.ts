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
    return this.http.post<SubjectModel>(`${this.API_URL}/api/subjects/add`, subject).pipe(
      tap((saved:SubjectModel)=>{
        this.subjects.update(current=>[...current,saved]);
      })
    );
  }

  getSubjects(){
    return this.http.get<SubjectModel[]>(`${this.API_URL}/api/subjects-list/get`).pipe(
      tap((data:SubjectModel[])=>this.subjects.set(data))
    )
  }
}