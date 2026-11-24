import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BRAND, QUICK_CONTACT } from '../data/retrofy.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  brand = BRAND;
  quick = QUICK_CONTACT;
  formData = { name: '', phone: '', email: '', subject: '', message: '' };
  isSending = false;
  status = '';
  isError = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.formData.name || !this.formData.message || !(this.formData.email || this.formData.phone)) {
      this.isError = true;
      this.status = 'Попълнете име, съобщение и телефон или имейл.';
      return;
    }
    this.isSending = true;
    this.status = '';
    this.http.post('/api/contact', this.formData).subscribe({
      next: () => {
        this.isSending = false; this.isError = false;
        this.status = 'Запитването е изпратено. Ще ви отговорим днес.';
        this.formData = { name: '', phone: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        this.isSending = false; this.isError = true;
        this.status = err.error?.error || 'Запитването не беше изпратено. Обадете ни се на телефона.';
      }
    });
  }
}
