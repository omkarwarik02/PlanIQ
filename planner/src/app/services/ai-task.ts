import { HttpClient } from '@angular/common/http';
import { Injectable,inject, signal } from '@angular/core';
import { TasksBySubject } from '../interface/task.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AiUsage } from './ai-usage';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AiTask {
  private http = inject(HttpClient);

  private aiUsage = inject(AiUsage); 
  private API_URL = `${environment.apiUrl}/api/ai`;

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
        localStorage.setItem('helio_tasks',JSON.stringify(taskData));

        this.aiUsage.increment();
      }),
       catchError(err => {
        const message = err.error?.message ?? 'Failed to generate tasks';
        return throwError(() => new Error(message));
      })
    );
  }

  markCompleted(subject: string, title: string) {
    const updated = this._tasks().map(group => ({
      ...group,
      tasks: group.tasks.map(t =>
        group.subject === subject && t.title === title
          ? { ...t, isCompleted: true }
          : t
      )
    }));
    this._tasks.set(updated);
    localStorage.setItem('helio_tasks', JSON.stringify(updated));
  }

  deleteTask(taskToDelete: { subject: string; title: string }) {
    const updated = this._tasks()
      .map(group => ({
        ...group,
        tasks: group.tasks.filter(t =>
          !(group.subject === taskToDelete.subject && t.title === taskToDelete.title)
        )
      }))
      .filter(group => group.tasks.length > 0);
    this._tasks.set(updated);
    localStorage.setItem('helio_tasks', JSON.stringify(updated));
  }

  clearTasks(){
    this._tasks.set([]);
    localStorage.removeItem('helio_tasks');
  }

  private loadFromStorage():TasksBySubject[]{
    try{
      const stored = localStorage.getItem('helio_tasks');
      if (!stored) {
        return [];
      }
      return JSON.parse(stored) as TasksBySubject[];
    } catch {
      return [];
    }
  }
    
  }

