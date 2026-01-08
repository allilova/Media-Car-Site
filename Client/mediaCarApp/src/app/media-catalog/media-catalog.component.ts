import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-catalog',
  imports: [RouterLink],
  templateUrl: './media-catalog.component.html',
  styleUrl: './media-catalog.component.css'
})
export class MediaCatalogComponent {

  itemsPerPage = 6;
  currentPage = 1;

  
  products = [
    { title: 'VW Passat B6 B7 2010-2015', price: '270 лв', img: 'mediaExample.PNG' },
    { title: 'Audi A4 B8 2008-2016', price: '320 лв', img: 'mediaExample.PNG' },
    { title: 'BMW E46 Android 12', price: '290 лв', img: 'mediaExample.PNG' },
    { title: 'Mercedes W203 C-Class', price: '350 лв', img: 'mediaExample.PNG' },
    { title: 'Toyota Corolla 2007', price: '250 лв', img: 'mediaExample.PNG' },
    { title: 'Honda Civic 8th Gen', price: '280 лв', img: 'mediaExample.PNG' },
    { title: 'Opel Astra H', price: '260 лв', img: 'mediaExample.PNG' }, 
    { title: 'Golf 5 / 6 Navigation', price: '275 лв', img: 'mediaExample.PNG' },
  ];


  get visibleProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

 
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.scrollToTop();
    }
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isAdmin = true; 

  deleteProduct(id: number) {
    if(confirm('Сигурни ли сте, че искате да изтриете този артикул?')) {
      console.log('Изтриване на продукт с ID:', id);
      // Тук викаш сървиса за изтриване
    }
  }
}

