import { HttpClient } from '@angular/common/http';
import { Injectable,inject,signal } from '@angular/core';
import { DayPlan } from '../interface/plan.model';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private API_URL ='http://localhost:3000/api/ai';

  plan = signal<DayPlan[]>([]);

  generatePlan() {
    return this.http.post<DayPlan[]>(`${this.API_URL}/generate-plan`,{})
    .pipe(
      tap((data)=> this.plan.set(data))
    )
  }
  
  getPlan(){
    return this.plan;
  }

}
