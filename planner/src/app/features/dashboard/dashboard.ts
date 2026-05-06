import { Component, inject, computed, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { AddsubService } from '../../services/addsub.service';
import { AiTask } from '../../services/ai-task';
import { AiService } from '../../services/ai.service';

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

  subjects = this.subjectService.subjects;
  tasks = this.aiTask.tasks;
  duration = this.aiservice.plan;

  totalSubjects = computed(() => this.subjects().length);
  totalHours = computed(() => this.subjects().reduce((total, s) => total + (s.hours ?? 0), 0));

  ngOnInit() {
    this.subjectService.getSubjects().subscribe();
  }
}
