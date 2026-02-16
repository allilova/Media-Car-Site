import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  
  activeTab: 'orders' | 'bookings' = 'bookings';
  searchTerm: string = '';


  bookings: any[] = [];

  
  orders = [
    { id: 105, date: '15 Фев 2024', customer: 'Иван Петров', phone: '0888123456', product: 'VW Passat Navigation', price: 270, status: 'pending' },
    { id: 104, date: '14 Фев 2024', customer: 'Георги Илиев', phone: '0877999888', product: 'Задна Камера', price: 50, status: 'shipped' },
    { id: 103, date: '12 Фев 2024', customer: 'Мария Николова', phone: '0899111222', product: 'Android Media BMW E46', price: 320, status: 'completed' }
  ];

  statusOptions = [
    { value: 'Pending', label: 'Чакаща' },
    { value: 'Confirmed', label: 'Потвърдена' },
    { value: 'Completed', label: 'Изпълнена' },
    { value: 'Cancelled', label: 'Отказана' }
  ];

  orderStatusOptions = [
    { value: 'pending', label: 'Чакаща' },
    { value: 'shipped', label: 'Изпратена' },
    { value: 'completed', label: 'Завършена' },
    { value: 'cancelled', label: 'Отказана' }
  ];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  // --- ЗАРЕЖДАНЕ НА ДАННИ ---
  loadBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => console.error('Грешка при зареждане на часове:', err)
    });
  }

  // --- ДЕЙСТВИЯ ---
  deleteBooking(id: string) {
    if(confirm('Сигурни ли сте, че искате да изтриете тази резервация?')) {
      this.bookingService.deleteBooking(id).subscribe(() => {
        this.loadBookings(); 
      });
    }
  }

  
  deleteOrder(id: number) {
    if(confirm('Изтриване на поръчка?')) {
      this.orders = this.orders.filter(o => o.id !== id);
    }
  }
  onStatusChange(booking: any, event: any) {
    const newStatus = event.target.value;
    
    this.bookingService.updateBookingStatus(booking._id, newStatus).subscribe({
      next: (updated) => {
        booking.status = newStatus; 
      },
      error: (err) => {
        alert('Грешка при смяна на статуса');
        console.error(err);
      }
    });
  }

 
  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Confirmed': return 'status-confirmed';
      case 'Completed': return 'status-completed';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  onOrderStatusChange(order: any, event: any) {
    const newStatus = event.target.value;
    order.status = newStatus; 
    // Тук по-късно ще сложим: this.orderService.updateStatus(...)
  }

  getOrderStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'shipped': return 'status-shipped'; // Това е новото (Синьо)
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }
  // --- ФИЛТРИРАНЕ (Търсачка) ---
  get filteredBookings() {
    return this.bookings.filter(b => 
      b.user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      b.user.phone.includes(this.searchTerm)
    );
  }

  get filteredOrders() {
    return this.orders.filter(o => 
      o.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      o.id.toString().includes(this.searchTerm)
    );
  }

  // --- EXCEL EXPORT ---
  exportToExcel() {
    let dataToExport = [];
    let fileName = '';

    if (this.activeTab === 'bookings') {
      dataToExport = this.filteredBookings.map(b => ({
        'Дата': b.date,
        'Час': b.time,
        'Клиент': b.user.name,
        'Телефон': b.user.phone,
        'Адрес': b.user.address,
        'Имейл': b.user.email
      }));
      fileName = 'Reservations.xlsx';
    } else {
      dataToExport = this.filteredOrders;
      fileName = 'Orders.xlsx';
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  // --- СТАТИСТИКА ---
  get revenue() {
    return this.orders.reduce((acc, o) => acc + o.price, 0);
  }
}