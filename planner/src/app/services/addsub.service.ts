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
    return this.http.post<{message:String;subject:SubjectModel}>(`${this.API_URL}/api/subjects/add`, subject,{withCredentials:true}).pipe(
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
  deleteSub(id:string){
    return this.http.delete<{message:string}>(`${this.API_URL}/api/subjects/delete/${id}`,{withCredentials:true})
    .pipe(
      tap(()=>
      this.subjects.update((curr)=> curr.filter((s)=>s._id !==id)))
    )
  }
}