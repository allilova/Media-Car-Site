import { Component, OnInit } from '@angular/core';
import { ServicesCatalogComponent } from '../services-catalog/services-catalog.component';
import { ContactComponent } from '../contact/contact.component';
import { MediaCatalogComponent } from '../media-catalog/media-catalog.component';
import { AccessoriesCatalogComponent } from '../accessories-catalog/accessories-catalog.component';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';
import { AdminService } from '../services/admin.service';
import { HeroComponent } from '../sections/hero/hero.component';
import { PackagesComponent } from '../sections/packages/packages.component';
import { StepsComponent } from '../sections/steps/steps.component';
import { TrustComponent } from '../sections/trust/trust.component';
import { LaborComponent } from '../sections/labor/labor.component';
import { PortfolioComponent } from '../sections/portfolio/portfolio.component';
import { B2bComponent } from '../sections/b2b/b2b.component';
import { FaqComponent } from '../sections/faq/faq.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent, PackagesComponent, StepsComponent, TrustComponent, LaborComponent,
    PortfolioComponent, B2bComponent, FaqComponent,
    ServicesCatalogComponent, ContactComponent, MediaCatalogComponent,
    AccessoriesCatalogComponent, AdminOrdersComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.isAdmin$.subscribe(status => this.isAdmin = status);
  }
}
