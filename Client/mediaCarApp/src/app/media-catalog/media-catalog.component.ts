import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EurPipe } from '../shared/eur.pipe';
import { ProductService } from '../services/product.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-media-catalog',
  imports: [RouterLink, EurPipe],
  templateUrl: './media-catalog.component.html',
  styleUrl: './media-catalog.component.css'
})
export class MediaCatalogComponent implements OnInit{

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
    this.productService.getProducts('multimedia').subscribe({
      next: (data) => {
        this.loaded = true;
        this.products = data.map(item => ({
          ...item,
          id: item._id, 
          img: item.images?.[0] || 'mediaExample.PNG',
          fromPrice: item.variants?.length ? Math.min(...item.variants.map((v: any) => v.price)) : item.price
        }));
      },
      error: (err) => { this.loaded = true; console.error('Грешка при зареждане:', err); }
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

