import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent {
productId: string = '';
  
  product: any = {
    title: '',
    category: '',
    price: 0,
    oldPrice: 0,
    description: '',
    images: [], 
    specs: { os: '', screen: '', resolution: '', power: '' },
    variants: []
  };


  newImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.loadProductData();
    }
  }

  loadProductData() {
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        if (!this.product.specs) this.product.specs = {};
        if (!this.product.variants) this.product.variants = [];
      },
      error: (err) => console.error(err)
    });
  }


  removeExistingImage(index: number) {
    this.product.images.splice(index, 1);
  }

 
  onFileSelected(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (e: any) => {
          this.newImages.push(e.target.result);
        };
      }
    }
  }

  
  removeNewImage(index: number) {
    this.newImages.splice(index, 1);
  }

 
  addVariant() {
    this.product.variants.push({ ram: 4, rom: 64, price: 0, cpu: '4-ядрен' });
  }

  removeVariant(index: number) {
    this.product.variants.splice(index, 1);
  }

 
  onSave() {
    const combinedImages = [...this.product.images, ...this.newImages];

    const updatedProduct = {
      ...this.product,
      images: combinedImages
    };

    this.productService.updateProduct(this.productId, updatedProduct).subscribe({
      next: () => {
        alert('Промените са запазени!');
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error(err);
        alert('Грешка при запис.');
      }
    });
  }
}
