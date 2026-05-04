import { HttpClient } from '@angular/common/http';
import { Injectable,inject, signal } from '@angular/core';
import { TasksBySubject } from '../interface/task.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AiTask {
  private http = inject(HttpClient);
  private API_URL ='http://localhost:3000/api/ai';

  private _tasks = signal<TasksBySubject[]>(this.loadFromStorage());
  readonly tasks = this._tasks.asReadonly();


  generateTasks(){
    return this.http.post<any>(`${this.API_URL}/generate-tasks`,{}).pipe(
      tap(data => {
        const taskData = data?.tasksBySubject ?? [];
        // mark all tasks as not completed initially
        taskData.forEach((group:TasksBySubject)=>
          group.tasks.forEach(task => task.isCompleted = false)
        );
        this._tasks.set(taskData);
        localStorage.setItem('planiq_tasks',JSON.stringify(taskData));

      }),
       catchError(err => {
        const message = err.error?.message ?? 'Failed to generate tasks';
        return throwError(() => new Error(message));
      })
    );
  }

  clearTasks(){
    this._tasks.set([]);
    localStorage.removeItem('planiq_tasks');
  }

  private loadFromStorage():TasksBySubject[]{
    try{
      const stored = localStorage.getItem('planiq_tasks');
      if (!stored) {
        return [];
      }
      return JSON.parse(stored) as TasksBySubject[];
    } catch {
      return [];
    }
  }
    
  }

