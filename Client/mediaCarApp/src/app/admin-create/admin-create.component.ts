import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-create',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent {
product = {
    title: '',
    category: 'multimedia',
    price: null,
    oldPrice: null,
    description: '',
    specs: {
        os: 'Android 13',
        screen: 'QLED',
        resolution: '1280x720',
        power: '4 x 45W'
    },
    variants: [{ ram: 2, rom: 32, price: 270, cpu: '4-ядрен' }]
};

  previewImages: string[] = [];

 
  constructor(private productService: ProductService, private router: Router) {}

 

  onFileSelected(event: any) {
     if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result);
        };
      }
    }
  }
  
 
  onSubmit() {
    const finalProduct = {
      ...this.product,
      images: this.previewImages 
    };

    console.log('Изпращане към сървъра...', finalProduct);

    
    this.productService.createProduct(finalProduct).subscribe({
      next: (response) => {
        alert('Продуктът е добавен успешно!');
        this.router.navigate(['/']); 
      },
      error: (error) => {
        console.error('Грешка:', error);
        alert('Възникна грешка при записа. Виж конзолата.');
      }
    });
  }
  
 
  addVariant() {
    this.product.variants.push({ ram: 2, rom: 32, price: 270, cpu: '4-ядрен'});
  }

  removeVariant(index: number) {
     this.product.variants.splice(index, 1);
  }
  
  removeImage(index: number) {
    this.previewImages.splice(index, 1);
  }
}
