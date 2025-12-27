import { Component } from '@angular/core';

@Component({
  selector: 'app-accessories-catalog',
  imports: [],
  templateUrl: './accessories-catalog.component.html',
  styleUrl: './accessories-catalog.component.css'
})
export class AccessoriesCatalogComponent {
itemsPerPage = 6;
  currentPage = 1;

  
  products = [
    { title: 'HD Камера', price: '30 лв', img: 'accessoriesExample.PNG' },
    { title: 'Bluetooth Колона', price: '45 лв', img: 'accessoriesExample.PNG' }
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
}
