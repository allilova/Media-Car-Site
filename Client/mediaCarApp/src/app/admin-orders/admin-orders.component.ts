import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
activeTab: 'orders' | 'appointments' = 'orders';
  searchTerm: string = '';

  // --- MOCK ДАННИ (Примерни) ---
  
  orders = [
    { id: 1024, date: '2023-10-25', customerName: 'Иван Петров', phone: '0888123456', items: 'VW Passat Navigation, Задна камера', total: 285, status: 'pending' },
    { id: 1023, date: '2023-10-24', customerName: 'Георги Иванов', phone: '0899111222', items: 'BMW E46 Android', total: 290, status: 'completed' },
    { id: 1022, date: '2023-10-23', customerName: 'Мария Димитрова', phone: '0877333444', items: 'Audi A3 Media', total: 320, status: 'shipped' },
    { id: 1021, date: '2023-10-22', customerName: 'Стефан Стоянов', phone: '0888999888', items: 'OBD скенер', total: 20, status: 'cancelled' },
  ];

  appointments = [
    { id: 55, date: '2023-10-27', time: '14:00', customerName: 'Петър Колев', phone: '0887654321', address: 'София, ул. Витоша 5', serviceType: 'Монтаж на медия', status: 'pending' },
    { id: 54, date: '2023-10-26', time: '10:00', customerName: 'Елена Николова', phone: '0898555666', address: 'София, Младост 4', serviceType: 'Монтаж + Камера', status: 'completed' }
  ];

  // --- GETTERS (Филтриране) ---

  get filteredOrders() {
    return this.orders.filter(o => 
      o.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      o.id.toString().includes(this.searchTerm)
    );
  }

  get filteredAppointments() {
    return this.appointments.filter(a => 
      a.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      a.date.includes(this.searchTerm)
    );
  }

  // --- СТАТИСТИКА ---
  getPendingOrdersCount() {
    return this.orders.filter(o => o.status === 'pending').length;
  }

  getPendingAppointmentsCount() {
    return this.appointments.filter(a => a.status === 'pending').length;
  }

  calculateMonthlyRevenue() {
    return this.orders
      .filter(o => o.status !== 'cancelled')
      .reduce((acc, curr) => acc + curr.total, 0);
  }

  // --- HELPER ФУНКЦИИ ---
  
  getStatusLabel(status: string) {
    const labels: any = {
      'pending': 'Чакаща',
      'shipped': 'Изпратена',
      'completed': 'Завършена',
      'cancelled': 'Отказана'
    };
    return labels[status] || status;
  }

  updateOrderStatus(order: any, event: any) {
    order.status = event.target.value;
    // Тук би извикал API за запис
  }

  completeAppointment(app: any) {
    app.status = 'completed';
  }

  cancelAppointment(app: any) {
    app.status = 'cancelled';
  }

  // --- ЕКСПОРТ КЪМ EXCEL ---
  
  exportToExcel() {
    let dataToExport = [];
    let fileName = '';

    if (this.activeTab === 'orders') {
      
      dataToExport = this.filteredOrders.map(o => ({
        'ID Поръчка': o.id,
        'Дата': o.date,
        'Име на клиент': o.customerName,
        'Телефон': o.phone,
        'Артикули': o.items,
        'Сума (лв)': o.total,
        'Статус': this.getStatusLabel(o.status)
      }));
      fileName = 'Spravka_Porachki.xlsx';
    } else {
     
      dataToExport = this.filteredAppointments.map(a => ({
        'Дата': a.date,
        'Час': a.time,
        'Клиент': a.customerName,
        'Телефон': a.phone,
        'Адрес': a.address,
        'Услуга': a.serviceType,
        'Статус': this.getStatusLabel(a.status)
      }));
      fileName = 'Spravka_Rezervacii.xlsx';
    }

  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

   
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    
    XLSX.writeFile(wb, fileName);
  }
}
