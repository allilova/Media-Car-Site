import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;      
  variantId: number; 
  title: string;
  image: string;
  price: number;
  quantity: number;
  specs: string;   
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cartKey = 'my_shop_cart'; 

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
   
    this.loadCart();
  }

  
  private loadCart() {
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
    }
  }


  addToCart(product: any, variant: any, quantity: number) {
    const currentCart = this.cartSubject.value;
    
    
    const existingItem = currentCart.find(item => 
      item.id === product._id && item.variantId === variant.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
     
      const newItem: CartItem = {
        id: product._id || product.id, 
        variantId: variant.id,
        title: product.title,
        image: product.images[0] || 'assets/placeholder.png', 
        price: variant.price,
        quantity: quantity,
        specs: `${variant.ram}GB RAM / ${variant.rom}GB ROM - ${variant.cpu}`
      };
      currentCart.push(newItem);
    }

    this.updateCart(currentCart);
  }

  
  removeFromCart(productId: string, variantId: number) {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => 
      !(item.id === productId && item.variantId === variantId)
    );
    this.updateCart(updatedCart);
  }


  updateQuantity(productId: string, variantId: number, change: number) {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(i => i.id === productId && i.variantId === variantId);

    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId, variantId);
        return;
      }
      this.updateCart(currentCart);
    }
  }

  clearCart() {
    this.updateCart([]);
  }

  private updateCart(cart: CartItem[]) {
    this.cartSubject.next(cart);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

 
  getTotalPrice(): number {
    return this.cartSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
