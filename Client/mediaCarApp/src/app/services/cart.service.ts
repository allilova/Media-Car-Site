import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: string;
  variantId: string | null;
  title: string;
  image: string;
  price: number;
  quantity: number;
  specs: string;
}

const CART_KEY = 'retrofy_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.load());
  cart$ = this.cartSubject.asObservable();

  get items(): CartItem[] {
    return this.cartSubject.value;
  }

  get count(): number {
    return this.items.reduce((s, i) => s + i.quantity, 0);
  }

  private load(): CartItem[] {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      // Стари записи без productId (от предишната версия) се изхвърлят
      return Array.isArray(saved) ? saved.filter((i: any) => i && i.productId) : [];
    } catch {
      return [];
    }
  }

  private save(items: CartItem[]) {
    this.cartSubject.next(items);
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /* private mode */ }
  }

  /** variant е вариант от Mongo (с _id) или null за продукти без варианти */
  addToCart(product: any, variant: any | null, quantity = 1, specsOverride?: string) {
    const productId: string = product._id || product.id;
    const variantId: string | null = variant?._id ?? null;
    const items = [...this.items];
    const existing = items.find(i => i.productId === productId && i.variantId === variantId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      const specs = specsOverride
        ?? (variant?.ram ? `${variant.ram}GB RAM / ${variant.rom}GB ROM – ${variant.cpu}` : '');
      items.push({
        productId,
        variantId,
        title: product.title,
        image: product.images?.[0] || product.img || 'logo.png',
        price: Number(variant?.price ?? product.price) || 0,
        quantity,
        specs,
      });
    }
    this.save(items);
  }

  /** Маха всички редове на даден продукт (напр. услугата за монтаж) */
  removeProduct(productId: string) {
    this.save(this.items.filter(i => i.productId !== productId));
  }

  removeFromCart(productId: string, variantId: string | null) {
    this.save(this.items.filter(i => !(i.productId === productId && i.variantId === variantId)));
  }

  updateQuantity(productId: string, variantId: string | null, change: number) {
    const items = this.items.map(i => ({ ...i }));
    const item = items.find(i => i.productId === productId && i.variantId === variantId);
    if (!item) return;
    item.quantity += change;
    this.save(item.quantity < 1 ? items.filter(i => i !== item) : items);
  }

  getTotalPrice(): number {
    return this.items.reduce((s, i) => s + i.price * i.quantity, 0);
  }

  clearCart() {
    this.save([]);
  }
}
