import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CartService } from '../services/cart.service';
import { LogoComponent } from '../shared/logo.component';
import { BRAND } from '../data/retrofy.data';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isMenuOpen = false;
  isAdmin = false;
  cartCount = 0;
  brand = BRAND;

  links = [
    { id: 'packages', label: 'Пакети' },
    { id: 'media-catalog', label: 'Мултимедии' },
    { id: 'accessories-catalog', label: 'Аксесоари' },
    { id: 'labor', label: 'Цени за монтаж' },
    { id: 'faq', label: 'Въпроси' },
    { id: 'contacts', label: 'Контакти' },
  ];

  constructor(private authService: AdminService, private cart: CartService, private router: Router) {}

  ngOnInit() {
    this.authService.isAdmin$.subscribe(status => this.isAdmin = status);
    this.cart.cart$.subscribe(() => this.cartCount = this.cart.count);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen = false;
    const go = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    if (!this.router.url.startsWith('/home')) {
      this.router.navigate(['/home']).then(() => setTimeout(go, 120));
    } else {
      go();
    }
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
  }
}
