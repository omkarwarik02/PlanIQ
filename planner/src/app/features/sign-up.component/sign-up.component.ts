import { Component,inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup,FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth-service'

@Component({
  selector: 'app-sign-up.component',
  imports: [ButtonModule,DividerModule,InputTextModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {

private router = inject(Router);
private authService = inject(AuthService);

formSubmitted = false;

signUpForm = new FormGroup({
  name:new FormControl(''),
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required])
});


onSubmit(){
  this.formSubmitted = true;
  if(this.signUpForm.invalid){
    this.signUpForm.markAllAsTouched;
  }
  const data = this.signUpForm.value
  this.authService.signUp(data).subscribe({
    next:()=>{
      console.log("Signup done")
      this.router.navigate(['/login'])
    },
    error:(err)=>{
      alert(err.error?.message || 'SignUp failed');
    }
  })

}

}
