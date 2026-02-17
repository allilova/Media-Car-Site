import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Увери се в пътя!

@Component({
  selector: 'app-basket-plus',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './basket-plus.component.html',
  styleUrl: './basket-plus.component.css'
})
export class BasketPlusComponent {
@Output() closeModal = new EventEmitter<void>();
  constructor(private cartService: CartService) {}

  toggleInstallation(event: any) {
    const isChecked = event.target.checked;
    const serviceId = 'service-installation';

    if (isChecked) {
   
      this.cartService.addToCart({
        _id: serviceId,
        title: 'Професионален монтаж на адрес',
        price: 70,
        img: 'assets/service-icon.png',
        specs: 'Услуга'
      }, null, 1); 
    } else {
      
      this.cartService.removeItem(serviceId);
    }
  }

  addAccessory(title: string, price: number, img: string, id: string) {
   
    this.cartService.addToCart({
      _id: id,
      title: title,
      price: price,
      img: img,
      specs: 'Аксесоар'
    }, null, 1);
    
    alert(`${title} е добавен!`);
  }
  close() {
    this.closeModal.emit();
  }
}