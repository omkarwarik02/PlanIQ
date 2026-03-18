import { Routes } from '@angular/router';
import { AddSubject } from './features/subjects/add-subject/add-subject';

import { SignUpComponent } from './features/sign-up.component/sign-up.component';
import { LoginComponent } from './features/login.component/login.component';
import { Dashboard } from './features/dashboard/dashboard';
import { HomeComponent } from './features/home.component/home.component';
import { authGuard } from './guards/auth-guard';
import { SubjectsComponent } from './features/subjects.component/subjects.component';
export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'addSub',component:AddSubject,canActivate: [authGuard]},
    {path:'signup',component:SignUpComponent},
    {path:'login',component:LoginComponent},
    {path:'subjects',component:SubjectsComponent, canActivate:[authGuard]},
    {path:'dashboard',component:Dashboard, canActivate:[authGuard]}
];
