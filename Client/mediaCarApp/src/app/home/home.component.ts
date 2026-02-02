import { Component, OnInit } from '@angular/core';
import { ServicesCatalogComponent } from '../services-catalog/services-catalog.component';
import { ContactComponent } from '../contact/contact.component';
import { MediaCatalogComponent } from '../media-catalog/media-catalog.component';
import { AccessoriesCatalogComponent } from '../accessories-catalog/accessories-catalog.component';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-home',
  imports: [
      ServicesCatalogComponent, 
      ContactComponent, 
      MediaCatalogComponent, 
      AccessoriesCatalogComponent,
      AdminOrdersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isAdmin = false;
  constructor(private adminService: AdminService) {}
  ngOnInit() {
    
    this.adminService.isAdmin$.subscribe(status => {
      this.isAdmin = status;
    });
  }

  scrollToCatalog() {
    document.getElementById('media-catalog')?.scrollIntoView({ behavior: 'smooth' });
  }
}
