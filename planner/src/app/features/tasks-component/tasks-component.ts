import { Component,computed,inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AiTask } from '../../services/ai-task';
import { CommonModule, NgForOf } from '@angular/common';
import { Task } from '../../interface/task.model';

type TaskWithSubject = Task & { subject: string };

@Component({
  selector: 'app-tasks-component',
  imports: [ButtonModule, CheckboxModule, FormsModule, NgForOf, CommonModule],
  templateUrl: './tasks-component.html',
  styleUrl: './tasks-component.scss',
})
export class TasksComponent {
  private aiTask = inject(AiTask);

  tasks = this.aiTask.tasks;

  isLoading = signal(false);

  alltasks = computed((): TaskWithSubject[] =>
    this.tasks().flatMap(g => g.tasks.map(t => ({ ...t, subject: g.subject })))
  );

  completedCount = computed(() => this.alltasks().filter(t => t.isCompleted).length);
  remainingCount = computed(() => this.alltasks().length - this.completedCount());

  onCheckboxChange(task: TaskWithSubject) {
    const groups = this.tasks().map(g => ({
      ...g,
      tasks: g.tasks.map(t => t === task ? { ...t, isCompleted: true } : t)
    }));
    localStorage.setItem('planiq_tasks', JSON.stringify(groups));
  }

  deleteTask(task: TaskWithSubject) {
    this.aiTask.deleteTask(task);
  }

  generateTasks() {
    this.isLoading.set(true);
    this.aiTask.generateTasks().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err.message);
        this.isLoading.set(false);
      }
    });
  }
}
