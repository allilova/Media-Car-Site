import { Component } from '@angular/core';
import { ServicesCatalogComponent } from '../services-catalog/services-catalog.component';
import { ContactComponent } from '../contact/contact.component';
import { MediaCatalogComponent } from '../media-catalog/media-catalog.component';
import { AccessoriesCatalogComponent } from '../accessories-catalog/accessories-catalog.component';
import { RouterLink } from '@angular/router';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';

@Component({
  selector: 'app-home',
  imports: [
      ServicesCatalogComponent, 
      ContactComponent, 
      MediaCatalogComponent, 
      AccessoriesCatalogComponent,
      AdminOrdersComponent,
      RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
scrollToCatalog() {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
   isAdmin = true; 
}
