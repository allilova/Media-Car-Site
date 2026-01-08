import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // За ngModel
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
credentials = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  login() {
    // Тук ще е логиката за вход по-късно
    console.log('Login attempt:', this.credentials);
    
    if (this.credentials.username && this.credentials.password) {
        // Примерно пренасочване към админ дашборд
        // this.router.navigate(['/admin/dashboard']);
        alert("Входът е симулиран!");
    }
  }
}
