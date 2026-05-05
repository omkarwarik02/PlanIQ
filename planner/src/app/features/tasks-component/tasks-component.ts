import { Component,inject } from '@angular/core';
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
  isChecked: boolean = false;


  onCheckboxChange(event:any){
    this.isChecked = true;
  }
  deleteTask(){
    
  }

  generateTasks(){
    this.aiTask.generateTasks().subscribe({
      next:() =>{
        console.log("Task Created");
      }
    })
  }
}
