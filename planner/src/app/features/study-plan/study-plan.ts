import { Component,inject,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AiService } from '../../services/ai.service';
import { TableRow } from '../../interface/plan.model';

@Component({
  selector: 'app-study-plan',
  imports: [CommonModule,ButtonModule,TableModule],
  templateUrl: './study-plan.html',
  styleUrl: './study-plan.scss',
})
export class StudyPlan {

  private aiservice = inject(AiService);
  plan = this.aiservice.getPlan();
loading = signal(false);
error = signal('');

  // component

// convert nested to flat
get tableRows(): TableRow[] {
  const planData = this.plan();
if (!planData.length) return [];
const rows:TableRow[] = [];
  this.plan().forEach(day => {
    day.sessions.forEach((session, index) => {
      rows.push({
        day: day.day,
        isFirst: index === 0,          // is this the first session of the day?
        rowspan: day.sessions.length,  // how many sessions does this day have?
        subject: session.subject,
        duration: session.duration,
        focus: session.focus
      });
    });
  });

  return rows;
}


}
