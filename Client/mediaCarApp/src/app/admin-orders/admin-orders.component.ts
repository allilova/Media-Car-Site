import { EurPipe } from '../shared/eur.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [EurPipe, CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  
  activeTab: 'orders' | 'bookings' = 'bookings';
  searchTerm: string = '';


  bookings: any[] = [];
  orders: any[] = [];

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

  constructor(
    private bookingService: BookingService, 
    private orderService: OrderService) {}

  ngOnInit() {
    this.loadBookings();
    this.loadOrders();
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
  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log("Заредени поръчки:", data);
      },
      error: (err) => console.error(err)
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

  
    
  deleteOrder(id: string) {
    if(confirm('Сигурни ли сте, че искате да изтриете тази поръчка?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.loadOrders(); 
      });
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
    this.orderService.updateStatus(order._id, newStatus).subscribe(() => {
       order.status = newStatus; 
    });
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
      o.customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      o.customer.phone.includes(this.searchTerm) ||
      o._id.includes(this.searchTerm)
    );
  }

  // --- EXCEL EXPORT ---
  exportToExcel() {
    let dataToExport: any[] = [];
    let fileName = '';

    if (this.activeTab === 'bookings') {
      dataToExport = this.filteredBookings.map(b => ({
        'Дата': b.date,
        'Час': b.time,
        'Клиент': b.user.name,
        'Телефон': b.user.phone,
        'Адрес': b.user.address,
        'Имейл': b.user.email,
        'Кола': [b.car?.brand, b.car?.model, b.car?.year].filter(Boolean).join(' '),
        'Пакет': b.package || ''
      }));
      fileName = 'Reservations.csv';
    } else {
      dataToExport = this.filteredOrders.map(o => ({
        'Номер Поръчка': o._id.slice(-6),
        'Дата': new Date(o.createdAt).toLocaleDateString(),
        'Клиент': o.customer.name,
        'Телефон': o.customer.phone,
        'Адрес': o.customer.address,
        'Артикули': o.items.map((i: any) => `${i.title} (x${i.quantity}) ${i.variant ? ' - ' + i.variant : ''}`).join('; '),
        'Сума (€)': o.totalPrice,
        'Начин на плащане': o.paymentMethod || 'Наложен платеж',
        'Статус': o.status
      }));
      fileName = 'Orders.csv';
    }

    // CSV, който Excel отваря директно (BOM за кирилицата, ; за българските настройки)
    if (!dataToExport.length) return;
    const cell = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const headers = Object.keys(dataToExport[0]);
    const csv = [headers.map(cell).join(';'), ...dataToExport.map((r: any) => headers.map(h => cell(r[h])).join(';'))].join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  // --- СТАТИСТИКА ---
  get revenue() {
    return this.orders
      .filter(o => o.status !== 'cancelled')
      .reduce((acc, o) => acc + o.totalPrice, 0);
  }
  }
