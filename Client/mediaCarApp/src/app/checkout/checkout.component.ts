import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartItem, CartService } from '../services/cart.service';
import { BookingService } from '../services/booking.service';
import { EurPipe } from '../shared/eur.pipe';
import { INSTALLATION, formatBgDate } from '../shared/slots';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink, EurPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  sending = false;
  error = '';
  done = false;

  formData = {
    name: '',
    phone: '',
    email: '',
    deliveryType: 'office' as 'office' | 'address',
    address: '',
  };

  constructor(
    private cartService: CartService,
    private bookingService: BookingService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
      if (items.length === 0 && !this.done) this.router.navigate(['/basket-shop']);
    });
  }

  /** Ако в количката има монтаж – доставката е до адреса на монтажа и се плаща на място */
  get installation(): CartItem | undefined {
    return this.cartItems.find(i => i.productId === INSTALLATION._id);
  }

  get installLabel(): string {
    const [date, time] = (this.installation?.specs || '').split(' ');
    return date ? `${formatBgDate(date)}, ${time} ч.` : '';
  }

  placeOrder() {
    this.error = '';
    const f = this.formData;
    if (!f.name.trim() || !f.phone.trim() || !f.address.trim()) {
      this.error = this.installation
        ? 'Попълнете име, телефон и адрес за монтажа.'
        : 'Попълнете име, телефон и офис или адрес за доставка.';
      return;
    }

    const inst = this.installation;
    const address = inst ? `(МОНТАЖ) ${f.address}` : (f.deliveryType === 'office' ? `(ОФИС) ${f.address}` : `(АДРЕС) ${f.address}`);

    const orderData = {
      customer: { name: f.name, phone: f.phone, email: f.email, address, city: inst ? 'София' : undefined },
      items: this.cartItems.map(i => ({ productId: i.productId, variantId: i.variantId, quantity: i.quantity, variant: i.specs })),
      paymentMethod: inst ? 'Плащане при монтаж' : 'Наложен платеж',
    };

    this.sending = true;
    this.http.post('/api/orders', orderData).subscribe({
      next: () => {
        if (inst) {
          const [date, time] = inst.specs.split(' ');
          const products = this.cartItems.filter(i => i !== inst).map(i => i.title).join(', ');
          this.bookingService.createBooking({
            date, time,
            package: 'Поръчка от сайта',
            note: products,
            user: { name: f.name, phone: f.phone, email: f.email, address: f.address }
          }).subscribe({ error: () => { /* поръчката е приета; часът ще се потвърди по телефона */ } });
        }
        this.done = true;
        this.sending = false;
        this.cartService.clearCart();
      },
      error: (err) => {
        this.sending = false;
        this.error = err.error?.error || 'Поръчката не беше изпратена. Опитайте отново или се обадете.';
      }
    });
  }
}
