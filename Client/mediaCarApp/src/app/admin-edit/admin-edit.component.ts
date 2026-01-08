import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent {
productId: string | null = '';

  // Моделът на продукта (първоначално празен)
  product = {
    title: '',
    category: '',
    price: 0,
    oldPrice: 0,
    description: '',
    images: [] as string[], // Съществуващи снимки (URL)
    variants: [] as any[]
  };

  // Нови снимки, които потребителят добавя сега
  newImages: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // 1. Взимаме ID-то от URL-а
    this.productId = this.route.snapshot.paramMap.get('id');

    // 2. Симулираме зареждане на данни от базата данни
    if (this.productId) {
      this.loadProductData(this.productId);
    }
  }

  loadProductData(id: string) {
    // В реално приложение тук ще има HTTP заявка
    // Сега просто попълваме с фалшиви данни за теста
    console.log(`Зареждане на продукт с ID: ${id}`);
    
    this.product = {
      title: 'VW Passat B6 Android 13 (Редакция)',
      category: 'multimedia',
      price: 270,
      oldPrice: 350,
      description: 'Това е оригиналното описание на продукта, което сега редактираме...',
      images: [
        'assets/media-product.png', // Примерна съществуваща снимка
      ],
      variants: [
        { ram: 2, rom: 32, price: 270 },
        { ram: 4, rom: 64, price: 350 }
      ]
    };
  }

  // --- ЛОГИКА ЗА СНИМКИ ---
  
  // Изтриване на стара снимка
  removeExistingImage(index: number) {
    this.product.images.splice(index, 1);
  }

  // Избор на нови файлове
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

  // Изтриване на нова (още незапазена) снимка
  removeNewImage(index: number) {
    this.newImages.splice(index, 1);
  }

  // --- ЛОГИКА ЗА ВАРИАНТИ ---
  addVariant() {
    this.product.variants.push({ ram: 0, rom: 0, price: 0 });
  }

  removeVariant(index: number) {
    this.product.variants.splice(index, 1);
  }

  // --- ЗАПАЗВАНЕ ---
  onSave() {
    // Обединяваме всичко за изпращане
    const finalData = {
      id: this.productId,
      ...this.product,
      newImagesToUpload: this.newImages
    };

    console.log("Запазване на промените:", finalData);
    alert("Промените са запазени успешно!");
    this.router.navigate(['/admin/dashboard']);
  }
}
