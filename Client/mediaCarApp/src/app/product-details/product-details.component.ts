import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
product: any = {
    title: '',
    images: [],
    variants: [],
    specs: {} 
  };

  selectedImage: string = '';
  selectedVariant: any = {};
  quantity = 1;
  activeTab = 'desc';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;

          if (this.product.images && this.product.images.length > 0) {
            this.selectedImage = this.product.images[0];
          }
          if (this.product.variants && this.product.variants.length > 0) {
            this.selectedVariant = this.product.variants[0];
          }
        },
        error: (err) => console.error('Error fetching product', err)
      });
    }
  }

  onVariantChange(event: any) {
    const variantId = event.target.value; 
    const found = this.product.variants.find((v: any) => v._id === variantId || v.id === variantId);
    if (found) {
      this.selectedVariant = found;
    }
  }
}
