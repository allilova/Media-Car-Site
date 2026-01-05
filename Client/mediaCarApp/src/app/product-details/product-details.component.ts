import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
product = {
    title: 'Мултимедия за Audi A3 (2003-2013) 7 инча',
    images: [
      'mediaExample.PNG', 
      'mediaExample.PNG',    
      'mediaExample.PNG'       
    ],
    
    variants: [
      { id: 1, ram: 2, rom: 32, cpu: '4-ядрен', price: 270, oldPrice: 350 },
      { id: 2, ram: 4, rom: 64, cpu: '8-ядрен', price: 380, oldPrice: 450 },
      { id: 3, ram: 8, rom: 128, cpu: '8-ядрен', price: 520, oldPrice: 600 }
    ]
  };

  
  selectedImage = this.product.images[0];
  selectedVariant = this.product.variants[0];
  quantity = 1;
  activeTab = 'desc'; 

 
  onVariantChange(event: any) {
    const variantId = Number(event.target.value);
    const found = this.product.variants.find(v => v.id === variantId);
    if (found) {
      this.selectedVariant = found;
    }
  }
}
