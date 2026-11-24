import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { EurPipe } from '../shared/eur.pipe';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, EurPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  notFound = false;
  selectedImage = '';
  selectedVariant: any = null;
  quantity = 1;
  activeTab: 'desc' | 'specs' | 'delivery' = 'desc';
  added = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private title: Title
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.title.setTitle(`${data.title} – Retrofy`);
        this.selectedImage = data.images?.[0] || 'mediaExample.PNG';
        this.selectedVariant = data.variants?.[0] ?? null;
      },
      error: () => this.notFound = true
    });
  }

  get price(): number {
    return this.selectedVariant?.price ?? this.product?.price;
  }

  get isMultimedia(): boolean {
    return this.product?.category === 'multimedia';
  }

  onVariantChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.selectedVariant = this.product.variants.find((v: any) => v._id === id) ?? this.selectedVariant;
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.selectedVariant, this.quantity);
    this.added = true;
  }

  buyNow() {
    this.addToCart();
    this.router.navigate(['/basket-shop']);
  }
}
