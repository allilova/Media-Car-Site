import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';    
import { BookingService } from '../services/booking.service'; 

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  daysInMonth: number[] = [];
  emptyDays: number[] = [];
  monthNames = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
  
  selectedDate: number | null = null;
  selectedTime: string | null = null;

  weekendSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  weekdaySlots = ['18:30', '19:00', '19:30', '20:00', '20:30'];
  availableSlots: string[] = [];

  userData = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  constructor(private bookingService: BookingService) {} 

  ngOnInit() {
    this.generateCalendar();
  }


  generateCalendar() {
     const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
     const startOffset = firstDay === 0 ? 6 : firstDay - 1; 
     const daysCount = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
     this.emptyDays = Array(startOffset).fill(0);
     this.daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
  }

  changeMonth(step: number) {
     this.currentMonth += step;
     if (this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; }
     else if (this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; }
     this.selectedDate = null; 
     this.selectedTime = null;
     this.generateCalendar();
  }

  selectDate(day: number) {
    this.selectedDate = day;
    this.selectedTime = null; 

    
    const checkDate = new Date(this.currentYear, this.currentMonth, day);
    const dayOfWeek = checkDate.getDay(); 

    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      this.availableSlots = this.weekendSlots; 
    } else {
      this.availableSlots = this.weekdaySlots; 
    }
  }
  selectTime(time: string) { this.selectedTime = time; }

  
  submitBooking() {
    if (!this.selectedDate || !this.selectedTime || !this.userData.name || !this.userData.phone) {
      alert("Моля, попълнете всички задължителни полета!");
      return;
    }

   
    const bookingData = {
      date: `${this.selectedDate} ${this.monthNames[this.currentMonth]} ${this.currentYear}`,
      time: this.selectedTime,
      user: this.userData
    };

    
    this.bookingService.createBooking(bookingData).subscribe({
      next: (res) => {
        alert("Вашият час е запазен успешно!");
     
        this.selectedDate = null;
        this.selectedTime = null;
        this.userData = { name: '', email: '', phone: '', address: '' };
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.error || "Възникна грешка при резервацията.");
      }
    });
  }
}