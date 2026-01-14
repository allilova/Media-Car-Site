import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  credentials = {
    email: '', 
    password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AdminService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Грешен имейл или парола!';
      }
    });
  }
}
