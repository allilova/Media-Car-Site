import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { CAR_BRANDS, YEARS, PACKAGES, BRAND } from '../data/retrofy.data';
import { slotsFor, toIso, formatBgDate } from '../shared/slots';

interface Day { iso: string; n: number; past: boolean; weekend: boolean; }

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  monthNames = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
  today = toIso(new Date());
  month = new Date().getMonth();
  year = new Date().getFullYear();
  days: Day[] = [];
  offset: number[] = [];

  selectedDate = '';
  selectedTime = '';
  takenSlots: string[] = [];

  brands = CAR_BRANDS;
  years = YEARS;
  packageOptions = [...PACKAGES.map(p => `${p.name} (${p.price})`), 'Само монтаж (моя медия)', 'Консултация / оглед'];
  phone = BRAND.phone;

  form = {
    package: '',
    brand: '', model: '', year: '',
    name: '', phone: '', email: '', address: '', note: ''
  };

  sending = false;
  error = '';
  confirmed = false;

  constructor(private bookingService: BookingService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.buildMonth();
    const q = this.route.snapshot.queryParamMap;
    const pkg = q.get('package');
    if (pkg) {
      this.form.package = this.packageOptions.find(o => o.startsWith(pkg)) || pkg;
      if (!this.packageOptions.includes(this.form.package)) this.packageOptions.unshift(this.form.package);
    }
    this.form.brand = q.get('brand') || '';
    this.form.model = q.get('model') || '';
    this.form.year = q.get('year') || '';
  }

  get models(): string[] {
    return this.brands.find(b => b.brand === this.form.brand)?.models ?? [];
  }

  get slots(): string[] {
    return slotsFor(this.selectedDate);
  }

  get dateLabel(): string {
    return formatBgDate(this.selectedDate);
  }

  get canGoBack(): boolean {
    const now = new Date();
    return this.year > now.getFullYear() || this.month > now.getMonth();
  }

  buildMonth() {
    const first = new Date(this.year, this.month, 1).getDay();
    this.offset = Array(first === 0 ? 6 : first - 1).fill(0);
    const count = new Date(this.year, this.month + 1, 0).getDate();
    this.days = Array.from({ length: count }, (_, i) => {
      const d = new Date(this.year, this.month, i + 1);
      const iso = toIso(d);
      return { iso, n: i + 1, past: iso < this.today, weekend: d.getDay() === 0 || d.getDay() === 6 };
    });
  }

  changeMonth(step: number) {
    this.month += step;
    if (this.month > 11) { this.month = 0; this.year++; }
    if (this.month < 0) { this.month = 11; this.year--; }
    this.buildMonth();
  }

  selectDate(day: Day) {
    if (day.past) return;
    this.selectedDate = day.iso;
    this.selectedTime = '';
    this.takenSlots = [];
    this.bookingService.getTakenSlots(day.iso).subscribe(t => this.takenSlots = t);
  }

  isPastSlot(time: string): boolean {
    if (this.selectedDate !== this.today) return false;
    const [h, m] = time.split(':').map(Number);
    const now = new Date();
    return h * 60 + m <= now.getHours() * 60 + now.getMinutes() + 120;
  }

  submit() {
    this.error = '';
    const f = this.form;
    if (!this.selectedDate || !this.selectedTime) { this.error = 'Изберете ден и час.'; return; }
    if (!f.name.trim() || !f.phone.trim() || !f.address.trim()) { this.error = 'Попълнете име, телефон и адрес за монтажа.'; return; }

    this.sending = true;
    this.bookingService.createBooking({
      date: this.selectedDate,
      time: this.selectedTime,
      package: f.package,
      car: { brand: f.brand, model: f.model, year: f.year },
      note: f.note,
      user: { name: f.name, phone: f.phone, email: f.email, address: f.address }
    }).subscribe({
      next: () => { this.sending = false; this.confirmed = true; },
      error: (err) => {
        this.sending = false;
        this.error = err.error?.error || 'Часът не беше запазен. Обадете ни се.';
        if (err.status === 409) this.selectDate(this.days.find(d => d.iso === this.selectedDate)!);
      }
    });
  }
}
