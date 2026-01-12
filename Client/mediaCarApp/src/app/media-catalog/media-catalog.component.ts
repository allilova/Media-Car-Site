import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-media-catalog',
  imports: [RouterLink],
  templateUrl: './media-catalog.component.html',
  styleUrl: './media-catalog.component.css'
})
export class MediaCatalogComponent implements OnInit{

isAdmin = true; 
  
 
  products: any[] = [];
  
 
  currentPage = 1;
  itemsPerPage = 6;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts('multimedia').subscribe({
      next: (data) => {
        this.products = data.map(item => ({
          ...item,
          id: item._id, 
          img: item.images && item.images.length > 0 ? item.images[0] : 'assets/placeholder.png'
        }));
      },
      error: (err) => console.error('Грешка при зареждане:', err)
    });
  }


  get visibleProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }


  deleteProduct(id: string) {
    if(confirm('Сигурни ли сте?')) {
        this.productService.deleteProduct(id).subscribe(() => {
            this.loadProducts();
        });
    }
  }
}

