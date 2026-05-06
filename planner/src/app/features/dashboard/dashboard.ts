import { Component, inject, computed, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { AddsubService } from '../../services/addsub.service';
import { AiTask } from '../../services/ai-task';
import { AiService } from '../../services/ai.service';
import { AiUsage } from '../../services/ai-usage';

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private subjectService = inject(AddsubService);
  private aiTask = inject(AiTask);
  private aiservice = inject(AiService);
  private aiUsage = inject(AiUsage);

  subjects = this.subjectService.subjects;
  tasks = this.aiTask.tasks;
  duration = this.aiservice.plan;
  aiUsageCount = this.aiUsage.usage;

  totalSubjects = computed(() => this.subjects().length);
  totalHours = computed(() => this.subjects().reduce((total, s) => total + (s.hours ?? 0), 0));
  totaltasks = computed(() => this.tasks().flatMap(g=>g.tasks).length);
  ngOnInit() {
    this.subjectService.getSubjects().subscribe();
    this.aiUsage.usage();
    
  }
}
