import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { BookingService } from '../../services/booking.service';
import { EurPipe } from '../../shared/eur.pipe';
import { INSTALLATION, slotsFor, toIso, formatBgDate } from '../../shared/slots';

@Component({
  selector: 'app-basket-plus',
  standalone: true,
  imports: [FormsModule, EurPipe],
  templateUrl: './basket-plus.component.html',
  styleUrl: './basket-plus.component.css'
})
export class BasketPlusComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  installation = INSTALLATION;
  wantsInstallation = false;
  installDate = '';
  installTime = '';
  takenSlots: string[] = [];
  minDate = toIso(new Date());
  accessories: any[] = [];
  addedIds = new Set<string>();
  error = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.wantsInstallation = this.cartService.items.some(i => i.productId === INSTALLATION._id);
    const inCart = new Set(this.cartService.items.map(i => i.productId));
    this.productService.getProducts('accessories').subscribe({
      next: data => this.accessories = data.filter(a => !inCart.has(a._id)).slice(0, 3),
      error: () => this.accessories = []
    });
  }

  get slots(): string[] {
    return slotsFor(this.installDate);
  }

  get dateLabel(): string {
    return formatBgDate(this.installDate);
  }

  onDateChange() {
    this.installTime = '';
    this.takenSlots = [];
    if (this.installDate) {
      this.bookingService.getTakenSlots(this.installDate).subscribe(t => this.takenSlots = t);
    }
  }

  toggleInstallation() {
    this.wantsInstallation = !this.wantsInstallation;
    if (!this.wantsInstallation) {
      this.cartService.removeProduct(INSTALLATION._id);
      this.installDate = '';
      this.installTime = '';
    }
  }

  addAccessory(item: any) {
    this.cartService.addToCart(item, item.variants?.[0] ?? null, 1);
    this.addedIds.add(item._id);
  }

  close() {
    this.closeModal.emit();
  }

  proceedToCheckout() {
    this.error = '';
    if (this.wantsInstallation) {
      if (!this.installDate || !this.installTime) {
        this.error = 'Изберете ден и час за монтажа.';
        return;
      }
      this.cartService.removeProduct(INSTALLATION._id);
      this.cartService.addToCart(INSTALLATION, null, 1, `${this.installDate} ${this.installTime}`);
    }
    this.close();
    this.router.navigate(['/checkout']);
  }
}
