import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Subject } from '../../models/subject.model';
@Component({
  selector: 'app-subjects.component',
  imports: [CardModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent {

  subjects:Subject[]=[]
}
