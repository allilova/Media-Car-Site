import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  
  searchQuery: string = ''; 
  results: any[] = [];     
  hasSearched: boolean = false;

  constructor(private productService: ProductService) {}

  onSearch() {
  
    if (!this.searchQuery.trim()) return;

    this.hasSearched = true;

    this.productService.getProducts(undefined, this.searchQuery).subscribe({
      next: (data) => {
        this.results = data.map(item => ({
             ...item,
             img: item.images && item.images.length > 0 ? item.images[0] : 'assets/placeholder.png'
        }));
      },
      error: (err) => console.error('Грешка при търсене:', err)
    });
  }
}