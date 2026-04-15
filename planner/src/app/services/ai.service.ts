import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DayPlan } from '../interface/plan.model';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/api/ai';

  private _plan = signal<DayPlan[]>(this.loadFromStorage());
  readonly plan = this._plan.asReadonly();

  generatePlan() {
    return this.http.post<any>(`${this.API_URL}/generate-plan`, {}).pipe(
      tap(data => {
        const planData = data?.plan || (Array.isArray(data) ? data : []);
        this._plan.set(planData);
        localStorage.setItem('planiq_plan', JSON.stringify(planData));
      }),
      catchError(err => {
        const message = err.error?.message ?? 'Failed to generate plan';
        return throwError(() => new Error(message));
      })
    );
  }

  clearPlan() {
    this._plan.set([]);
    localStorage.removeItem('planiq_plan');
  }

  private loadFromStorage(): DayPlan[] {
    try {
      const stored = localStorage.getItem('planiq_plan');
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed?.plan || (Array.isArray(parsed) ? parsed : []);
    } catch {
      return [];
    }
  }
}