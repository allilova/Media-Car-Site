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
    
    // Безопасно взимане на id и цена, дори ако variant e null (напр. при услуги)
    const vId = variant ? variant.id : 1;
    const vPrice = variant ? variant.price : product.price;

    const existingItem = currentCart.find(item => 
      item.id === product._id && item.variantId === vId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Определяне на характеристиките (specs) гъвкаво
      const itemSpecs = variant && variant.specs 
        ? variant.specs 
        : (variant && variant.ram ? `${variant.ram}GB RAM / ${variant.rom}GB ROM - ${variant.cpu}` : product.specs || '');

      // Определяне на снимката гъвкаво
      const itemImage = product.images && product.images.length > 0 
        ? product.images[0] 
        : (product.img || 'sevicesImg.png');

      const newItem: CartItem = {
        id: product._id || product.id, 
        variantId: vId,
        title: product.title,
        image: itemImage, 
        price: vPrice,
        quantity: quantity,
        specs: itemSpecs
      };
      currentCart.push(newItem);
    }

    this.updateCart(currentCart);
  }

removeItem(productId: string) {
    const currentItems = this.cartSubject.value;
    

    const updatedItems = currentItems.filter((item: any) => item._id !== productId);
    
    this.cartSubject.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
  }

  private saveCartToLocalStorage(items: any[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  private loadCartFromLocalStorage(): any[] {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
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
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  private updateCart(cart: CartItem[]) {
    this.cartSubject.next(cart);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

 
  getTotalPrice() {
     return this.cartSubject.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }


}
