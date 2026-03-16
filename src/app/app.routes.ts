import { Routes } from '@angular/router';
import { AddSubject } from './features/subjects/add-subject/add-subject';
import { SubjectList } from './features/subject-list/subject-list';

export const routes: Routes = [
    {path:'addSub',component:AddSubject},
    {path:'subjects',component:SubjectList}
];
