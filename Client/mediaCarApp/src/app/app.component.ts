import { Component } from '@angular/core';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {ServicesCatalogComponent} from "./services-catalog/services-catalog.component";
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, ServicesCatalogComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mediaCarApp';
}
