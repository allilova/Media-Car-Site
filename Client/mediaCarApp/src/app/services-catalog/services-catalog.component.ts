import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AdminService } from '../services/admin.service'; 

@Component({
  selector: 'app-services-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-catalog.component.html',
  styleUrl: './services-catalog.component.css'
})
export class ServicesCatalogComponent implements OnInit {
  
  services: any[] = [];
  isAdmin = false; 

  constructor(
    private productService: ProductService,
    private adminService: AdminService 
  ) {}

  ngOnInit() {
    this.loadServices();
    
   
    this.adminService.isAdmin$.subscribe(status => {
      this.isAdmin = status;
    });
  }

  loadServices() {
    this.productService.getProducts('services').subscribe({
      next: (data) => {
        this.services = data;
        console.log('Заредени услуги:', this.services);
      },
      error: (err) => {
        console.error('Грешка при зареждане на услугите:', err);
      }
    });
  }

  
  deleteService(id: string) {
    if(confirm('Сигурни ли сте, че искате да изтриете тази услуга?')) {
        this.productService.deleteProduct(id).subscribe(() => {
            this.loadServices(); 
        });
    }
  }
}