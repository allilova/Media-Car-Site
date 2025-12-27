import { Component } from '@angular/core';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {ServicesCatalogComponent} from "./services-catalog/services-catalog.component";
import { ContactComponent } from './contact/contact.component';
import { MediaCatalogComponent } from './media-catalog/media-catalog.component';
import { AccessoriesCatalogComponent } from './accessories-catalog/accessories-catalog.component';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',
  imports: [NavBarComponent, 
    ServicesCatalogComponent, 
    ContactComponent, 
    MediaCatalogComponent, 
    AccessoriesCatalogComponent, 
    HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mediaCarApp';
}
