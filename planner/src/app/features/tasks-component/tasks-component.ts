import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
FormsModule
@Component({
  selector: 'app-tasks-component',
  imports: [ButtonModule,CheckboxModule,FormsModule],
  templateUrl: './tasks-component.html',
  styleUrl: './tasks-component.scss',
})
export class TasksComponent {
  isChecked: boolean = false;


  onCheckboxChange(event:any){
    this.isChecked = true;
  }
  deleteTask(){
    
  }
}
