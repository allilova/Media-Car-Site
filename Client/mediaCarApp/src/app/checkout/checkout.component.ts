import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  totalPrice: number = 0;

  
  formData = {
    name: '',
    phone: '',
    email: '',
    deliveryType: 'office',
    address: '',
    paymentMethod: 'cod'    
  };

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
   
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
      
      
      if (this.cartItems.length === 0) {
        this.router.navigate(['/home']);
      }
    });
  }

  placeOrder() {
    
    if (!this.formData.name || !this.formData.phone || !this.formData.address) {
      alert('Моля, попълнете полетата за Име, Телефон и Адрес/Офис!');
      return;
    }

    
    const orderData = {
      customer: {
        name: this.formData.name,
        phone: this.formData.phone,
        email: this.formData.email,
        city: 'Bulgaria', 
        address: this.formData.deliveryType === 'office' 
          ? `(ОФИС) ${this.formData.address}` 
          : `(АДРЕС) ${this.formData.address}`
      },
      items: this.cartItems.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        variant: item.specs || 'Standard'
      })),
      totalPrice: this.totalPrice,
      status: 'Pending'
    };

    
    this.http.post('/api/orders', orderData).subscribe({
      next: (res) => {
        alert('Поръчката е приета успешно! Ще се свържем с вас за потвърждение.');
        this.cartService.clearCart(); 
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error(err);
        alert('Възникна грешка при изпращането. Моля, опитайте отново.');
      }
    });
  }
}