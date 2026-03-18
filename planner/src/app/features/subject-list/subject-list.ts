import { Component, inject } from '@angular/core';
import { Subjects } from '../../core/services/subject';
import { Subject } from '../../models/subject.model';
import { MatTableModule, MatTable, MatColumnDef, MatHeaderRowDef, MatHeaderCell, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
@Component({
  selector: 'app-subject-list',
  imports: [MatTable, MatColumnDef, MatHeaderRowDef, MatHeaderCell, MatHeaderCellDef, MatCellDef,MatTableModule],
  templateUrl: './subject-list.html',
  styleUrl: './subject-list.scss',
})
export class SubjectList {
  private subjectService = inject(Subjects);
  displayedColumns: string[] = ['name', 'difficulty', 'hoursPerDay'];
  
  dataSource :any[] = []

  ngOnInit(): void {
    this.dataSource = this.subjectService.getSubject();
  }

}
