import { Component,computed,inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AiTask } from '../../services/ai-task';
FormsModule
@Component({
  selector: 'app-tasks-component',
  imports: [ButtonModule,CheckboxModule,FormsModule],
  templateUrl: './tasks-component.html',
  styleUrl: './tasks-component.scss',
})
export class TasksComponent {
  private aiTask = inject(AiTask);

  tasks = this.aiTask.tasks;

  isLoading = signal(false);
  isChecked: boolean = false;


  onCheckboxChange(event:any){
    this.isChecked = true;
  }
  deleteTask(){
    
  }


  alltasks = computed(() => this.tasks().flatMap(g=>g.tasks));

  generateTasks(){
    this.isLoading.set(true);
    this.aiTask.generateTasks().subscribe({
      next:() =>{
        console.log("Task Created");
        this.isLoading.set(false);
      },
      error:(err)=>{
        console.error(err.message);
        this.isLoading.set(false);
      }
    })
  }
}
