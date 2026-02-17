import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../services/cart.service';
import { BasketPlusComponent } from './basket-plus/basket-plus.component';

@Component({
  selector: 'app-basket-shop',
  imports: [CommonModule,RouterLink, BasketPlusComponent],
  templateUrl: './basket-shop.component.html',
  styleUrl: './basket-shop.component.css'
})
export class BasketShopComponent implements OnInit {
cartItems: CartItem[] = [];
  totalPrice: number = 0;

  showUpsellModal: boolean = false;

  constructor(public cartService: CartService) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  increaseQty(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.variantId, 1);
  }

  decreaseQty(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.variantId, -1);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id, item.variantId);
  }

 openCheckoutFlow() {
    this.showUpsellModal = true;
  }
}
