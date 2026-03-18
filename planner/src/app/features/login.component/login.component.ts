import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup,FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DestroyRef } from '@angular/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 
import { User } from '../../store/userStore/user';



@Component({
  selector: 'app-login.component',
  imports: [ButtonModule,DividerModule,InputTextModule,ReactiveFormsModule,ProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userStore = inject(User);
    private destroyRef = inject(DestroyRef);
  isLoading = false;

loginForm = new FormGroup({
  email:new FormControl('',[Validators.required,  Validators.email]),
  password:new FormControl('',[Validators.required])
});


  redirect(){
    this.router.navigate(['signup']);
  }





onSubmit() {
  
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;

  const data = this.loginForm.value;

  this.authService.logIn(data)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => (this.isLoading = false))
    )
    .subscribe({
      next: (res:any) => {
        console.log("LOGIN RESPONSE:", res);
        this.userStore.setUser(res.user)
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        alert(err.error?.message || 'Login failed');
      }
    });
}



}
