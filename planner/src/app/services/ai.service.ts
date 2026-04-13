import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private API_URL ='http://localhost:3000/api/ai';

  generatePlan() {
    return this.http.post<any>(`${this.API_URL}/generate-plan`,{})
  }
}
