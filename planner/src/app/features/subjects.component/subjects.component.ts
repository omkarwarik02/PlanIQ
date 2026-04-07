import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SubjectModel as Subject } from '../../interface/subject.model';
@Component({
  selector: 'app-subjects.component',
  imports: [CardModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent {

  subjects:Subject[]=[]
}
