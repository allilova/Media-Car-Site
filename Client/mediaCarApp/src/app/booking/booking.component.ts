import { Component } from '@angular/core';


@Component({
  selector: 'app-booking',
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  daysInMonth: number[] = [];
  emptyDays: number[] = []; // Празни клетки преди 1-во число
  monthNames = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
  
  selectedDate: number | null = null;
  selectedTime: string | null = null;

  // --- ЧАСОВЕ ---
  availableSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // --- ФОРМА ДАННИ ---
  userData = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  ngOnInit() {
    this.generateCalendar();
  }

  // Генерира дните за избрания месец
  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; 
    
    const daysCount = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.emptyDays = Array(startOffset).fill(0);
    this.daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
  }

  changeMonth(step: number) {
    this.currentMonth += step;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.selectedDate = null; 
    this.selectedTime = null;
    this.generateCalendar();
  }

  selectDate(day: number) {
    this.selectedDate = day;
    this.selectedTime = null; 
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  submitBooking() {
    if (!this.selectedDate || !this.selectedTime || !this.userData.name || !this.userData.phone) {
      alert("Моля, попълнете всички полета!");
      return;
    }
    
    console.log("Резервация:", {
      date: `${this.selectedDate} ${this.monthNames[this.currentMonth]} ${this.currentYear}`,
      time: this.selectedTime,
      user: this.userData
    });
    
    alert("Вашият час е запазен успешно!");
  }
}
