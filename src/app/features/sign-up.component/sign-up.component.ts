import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up.component',
  imports: [ButtonModule,DividerModule,InputTextModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {

}
