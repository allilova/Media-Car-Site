import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../services/cart.service';
import { BasketPlusComponent } from './basket-plus/basket-plus.component';
import { EurPipe } from '../shared/eur.pipe';

@Component({
  selector: 'app-basket-shop',
  imports: [RouterLink, BasketPlusComponent, EurPipe],
  templateUrl: './basket-shop.component.html',
  styleUrl: './basket-shop.component.css'
})
export class BasketShopComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  showUpsellModal = false;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  increaseQty(item: CartItem) { this.cartService.updateQuantity(item.productId, item.variantId, 1); }
  decreaseQty(item: CartItem) { this.cartService.updateQuantity(item.productId, item.variantId, -1); }
  removeItem(item: CartItem) { this.cartService.removeFromCart(item.productId, item.variantId); }
  openCheckoutFlow() { this.showUpsellModal = true; }
}
