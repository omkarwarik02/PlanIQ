import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiUsage {
  
  private _usage = signal<number>(this.loadFromStorage());
  readonly usage = this._usage.asReadonly();

  increment(){
    const current = this._usage();
    const newVal = current + 1;
    this._usage.set(newVal);
    localStorage.setItem('planiq_ai_usage',String(newVal));
  }

  private loadFromStorage(): number{
    const stored = localStorage.getItem('planiq_ai_usage');
    if(!stored) return 0;
    return parseInt(stored);
  }















}
