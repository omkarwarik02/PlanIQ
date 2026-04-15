import { Component, inject, signal, computed } from '@angular/core';
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
  plan = this.aiservice.plan;
  loading = signal(false);
  error = signal('');

  tableRows = computed(() => {
    const planData = this.plan();
    if (!planData || !planData.length) return [];
    
    const rows: TableRow[] = [];
    planData.forEach(day => {
      if (day.sessions && day.sessions.length > 0) {
        day.sessions.forEach((session, index) => {
          rows.push({
            day: day.day,
            isFirst: index === 0,          
            rowspan: day.sessions.length,  
            subject: session.subject,
            duration: session.duration,
            focus: session.focus
          });
        });
      }
    });

    return rows;
  });

}

