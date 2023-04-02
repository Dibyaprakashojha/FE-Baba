import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  credentials!: {
    username: '';
    password: '';
  };

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted', this.loginForm.value.username);
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authService.generateToken(username, password).subscribe({
      next: (data: any) => {
        console.log(`Token`, data.token);
        this.authService.loginUser(data.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(`Error`, err);
      },
    });
  }
}
