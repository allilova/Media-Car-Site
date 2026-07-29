import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-basket-plus',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './basket-plus.component.html',
  styleUrl: './basket-plus.component.css'
})
export class BasketPlusComponent {
  @Output() closeModal = new EventEmitter<void>();

  wantsInstallation: boolean = false;
  installDate: string = '';
  installTime: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  toggleInstallation(event: any) {
    this.wantsInstallation = event.target.checked;
    

    if (!this.wantsInstallation) {
      this.cartService.removeItem('service-installation');
      this.installDate = '';
      this.installTime = '';
    }
  }

  addAccessory(title: string, price: number, img: string, id: string) {
    this.cartService.addToCart({
      _id: id,
      title: title,
      img: img,
      price: price,
      specs: 'Аксесоар'
    }, null, 1);
    
    alert(`${title} беше добавен успешно!`);
  }

  close() {
    this.closeModal.emit();
  }

  proceedToCheckout() {
    if (this.wantsInstallation) {
      if (!this.installDate || !this.installTime) {
        alert('Моля, изберете ден и час за монтажа!');
        return; 
      }

      this.cartService.addToCart({
        _id: 'service-installation',
        title: 'Професионален монтаж на адрес',
        img: 'assets/logo.png',
        price: 70
      }, {
        id: 1, 
        price: 70, 
        specs: `Избран час: ${this.installDate} / ${this.installTime} ч.` 
      }, 1);
    }

   
    this.close();
    this.router.navigate(['/checkout']);
  }
}