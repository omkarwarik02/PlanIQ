import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api'
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { User } from '../../store/userStore/user';
import { Toolbar } from 'primeng/toolbar';
@Component({
  selector: 'app-shell.component',
  standalone:true,
  imports: [ToolbarModule, RouterOutlet,],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
private router = inject(Router);
private userStore = inject(User);



  logout(){
    this.userStore.clear();
  }

}
