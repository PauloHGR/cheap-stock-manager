import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { AuthRequest } from './authRequest.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isForSignUp = signal<boolean>(false);
  isLogged = signal<boolean>(true);
  private authService = inject(AuthService);
  private router = inject(Router);
  error = signal<string>('');

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required]
    }),
  });

  onSwapUserAuth(){
    this.isForSignUp.set(!this.isForSignUp());
    this.isLogged.set(!this.isLogged());
  }

  onUpdateError(){
    this.error.set('');
  }

  onSubmit(){
    const request: AuthRequest = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    let authObservation: Observable<AuthResponse>;

    if(this.isLogged()){
      authObservation = this.authService.loginUser(request);
    } else {
      authObservation = this.authService.signUpUser(request);
    }

    authObservation
    .subscribe({
      error: (e: Error) => this.error.set(e.message),
      complete: () => this.router.navigate(['/stocks'])
    });
  }
}
