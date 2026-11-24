import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CAR_BRANDS, YEARS, PACKAGES, PREMIUM_BRANDS, BRAND } from '../../data/retrofy.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  brands = CAR_BRANDS;
  years = YEARS;
  phone = BRAND.phone;

  brand = '';
  model = '';
  year = '';

  get models(): string[] {
    return this.brands.find(b => b.brand === this.brand)?.models ?? [];
  }

  get recommended() {
    if (!this.brand) return null;
    const id = PREMIUM_BRANDS.includes(this.brand) ? 'premium' : 'standard';
    return PACKAGES.find(p => p.id === id)!;
  }

  get carLabel(): string {
    return [this.brand, this.model, this.year].filter(Boolean).join(' ');
  }

  get bookingParams() {
    return { brand: this.brand, model: this.model, year: this.year, package: this.recommended?.name };
  }

  onBrandChange() {
    this.model = '';
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
