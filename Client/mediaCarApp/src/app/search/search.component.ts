import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { EurPipe } from '../shared/eur.pipe';
import { CAR_BRANDS } from '../data/retrofy.data';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, RouterLink, EurPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  results: any[] = [];
  hasSearched = false;
  loading = false;
  brands = CAR_BRANDS.map(b => b.brand);

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('car') || params.get('q') || '';
      if (q) {
        this.searchQuery = q;
        this.run();
      }
    });
  }

  onSearch() {
    if (!this.searchQuery.trim()) return;
    this.router.navigate([], { queryParams: { q: this.searchQuery.trim() } });
  }

  pick(brand: string) {
    this.router.navigate([], { queryParams: { q: brand } });
  }

  private run() {
    this.hasSearched = true;
    this.loading = true;
    this.productService.getProducts(undefined, this.searchQuery.trim()).subscribe({
      next: (data) => {
        this.loading = false;
        this.results = data
          .filter(i => i.category !== 'portfolio')
          .map(item => ({
            ...item,
            img: item.images?.[0] || 'mediaExample.PNG',
            fromPrice: item.variants?.length ? Math.min(...item.variants.map((v: any) => v.price)) : item.price
          }));
      },
      error: () => { this.loading = false; this.results = []; }
    });
  }
}
