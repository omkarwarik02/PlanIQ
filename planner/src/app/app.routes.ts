import { Routes } from '@angular/router';
import { AddSubject } from './features/subjects/add-subject/add-subject';

import { SignUpComponent } from './features/sign-up.component/sign-up.component';
import { LoginComponent } from './features/login.component/login.component';
import { Dashboard } from './features/dashboard/dashboard';
import { HomeComponent } from './features/home.component/home.component';
import { authGuard } from './guards/auth-guard';
import { SubjectsComponent } from './features/subjects.component/subjects.component';
import { ShellComponent } from './shell/shell.component/shell.component';
import { StudyPlan } from './features/study-plan/study-plan';
import { TasksComponent } from './features/tasks-component/tasks-component';




export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'addSub', component: AddSubject },
      {path:'study-plan',component:StudyPlan},
      {path:'tasks',component:TasksComponent}
    
    ]
  }
];
