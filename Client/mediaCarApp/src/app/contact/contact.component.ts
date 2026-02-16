import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Трябва за формата
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSending = false; // За да покажем "Изпращане..."

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      alert('Моля, попълнете всички полета!');
      return;
    }

    this.isSending = true;

    // Пращаме към Backend-а
    this.http.post('/api/contact', this.formData).subscribe({
      next: (res) => {
        alert('Съобщението е изпратено успешно! Ще се свържем с вас скоро.');
        this.isSending = false;
        // Изчистваме формата
        this.formData = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Възникна грешка. Моля, опитайте по-късно.');
        this.isSending = false;
      }
    });
  }
}