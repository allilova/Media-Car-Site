import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EurPipe } from '../shared/eur.pipe';
import { ProductService } from '../services/product.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-accessories-catalog',
  imports: [RouterLink, EurPipe],
  templateUrl: './accessories-catalog.component.html',
  styleUrl: './accessories-catalog.component.css'
})
export class AccessoriesCatalogComponent implements OnInit {
isAdmin = false;
  products: any[] = [];
  loaded = false;
  currentPage = 1;
  itemsPerPage = 8;

  constructor(private productService: ProductService, private adminService: AdminService) {}

  ngOnInit() {
    this.loadProducts();
    this.adminService.isAdmin$.subscribe(status => {
      this.isAdmin = status;
    });
  }

  loadProducts() {
    this.productService.getProducts('accessories').subscribe({
      next: (data) => {
        this.loaded = true;
        this.products = data.map(item => ({
          ...item,
          id: item._id,
          img: item.images?.[0] || 'mediaExample.PNG',
          fromPrice: item.variants?.length ? Math.min(...item.variants.map((v: any) => v.price)) : item.price
        }));
      },
      error: (err) => { this.loaded = true; console.error('Грешка:', err); }
    });
  }

  
  get visibleProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  get totalPages() { return Math.ceil(this.products.length / this.itemsPerPage); }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
  prevPage() { if (this.currentPage > 1) this.currentPage--; }
  
  deleteProduct(id: string) {
    if(confirm('Сигурни ли сте?')) {
        this.productService.deleteProduct(id).subscribe(() => {
            this.loadProducts();
        });
    }
  }
}
