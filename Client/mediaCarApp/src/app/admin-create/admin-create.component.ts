import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
    variants: [
      { ram: 2, rom: 32, price: 270 } // Един вариант по подразбиране
    ]
  };

  // За преглед на качените снимки
  previewImages: string[] = [];

  // Обработка на файлове (Само визуализация за момента)
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

  removeImage(index: number) {
    this.previewImages.splice(index, 1);
  }

  // Логика за вариантите
  addVariant() {
    this.product.variants.push({ ram: 4, rom: 64, price: 350 });
  }

  removeVariant(index: number) {
    if (this.product.variants.length > 1) {
      this.product.variants.splice(index, 1);
    } else {
      alert("Продуктът трябва да има поне един вариант!");
    }
  }

  // Изпращане на формата
  onSubmit() {
    console.log("Създаване на продукт:", { ...this.product, images: this.previewImages });
    alert("Продуктът е създаден успешно! (Виж конзолата за данни)");
    // Тук ще добавиш логика за връзка с базата данни по-късно
  }
}
