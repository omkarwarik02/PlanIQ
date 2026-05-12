import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from "primeng/button";

@Component({
  selector: 'app-home.component',
  imports: [Button, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
