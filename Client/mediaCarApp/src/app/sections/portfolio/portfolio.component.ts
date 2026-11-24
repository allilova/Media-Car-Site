import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AdminService } from '../../services/admin.service';

/** Реални монтажи. Добавят се от админ панела с категория „Портфолио“:
 *  1-ва снимка = след монтажа, 2-ра снимка = преди. */
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink],
  template: `
  @if (items.length > 0 || isAdmin) {
  <section class="section" id="portfolio">
    <div class="wrap">
      <div class="head">
        <div class="section-head">
          <h2>Преди и след</h2>
          <p>Монтажи, които сме правили. Снимани с телефон, пред дома на клиента.</p>
        </div>
        @if (isAdmin) { <a class="btn btn-dark" routerLink="/admin-create" [queryParams]="{ category: 'portfolio' }">Добави монтаж</a> }
      </div>

      @if (items.length === 0) {
        <p class="empty">Още няма монтажи. Добавете снимки с категория „Портфолио“ – първата е „след“, втората „преди“. Секцията се вижда от клиентите, щом има поне един монтаж.</p>
      }

      <div class="grid">
        @for (item of items; track item._id) {
          <figure class="work">
            <div class="shot">
              <img [src]="showBefore[item._id] && item.images[1] ? item.images[1] : item.images[0]" [alt]="item.title" loading="lazy">
              @if (item.images.length > 1) {
                <div class="toggle" role="group" aria-label="Преди или след">
                  <button [class.on]="showBefore[item._id]" (click)="showBefore[item._id] = true">Преди</button>
                  <button [class.on]="!showBefore[item._id]" (click)="showBefore[item._id] = false">След</button>
                </div>
              }
              @if (isAdmin) {
                <div class="admin-actions">
                  <a class="icon-btn" [routerLink]="['/admin-edit', item._id]" title="Редактирай"><i class="fa-solid fa-pen"></i></a>
                  <button class="icon-btn danger" (click)="remove(item._id)" title="Изтрий"><i class="fa-solid fa-trash"></i></button>
                </div>
              }
            </div>
            <figcaption><strong>{{ item.title }}</strong>@if (item.description) {<span>{{ item.description }}</span>}</figcaption>
          </figure>
        }
      </div>
    </div>
  </section>
  }`,
  styles: [`
    .head { display: flex; justify-content: space-between; align-items: end; gap: 20px; flex-wrap: wrap; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
    .shot { position: relative; aspect-ratio: 4 / 3; border-radius: var(--r-panel); overflow: hidden; background: #E9EDF1; }
    .shot img { width: 100%; height: 100%; object-fit: cover; }
    .toggle { position: absolute; left: 12px; bottom: 12px; display: flex; background: rgba(14,26,43,.8); border-radius: 999px; padding: 4px; }
    .toggle button { border: 0; background: none; color: #fff; padding: 6px 14px; border-radius: 999px; font-size: 14px; }
    .toggle button.on { background: var(--amber); color: var(--ink); font-weight: 600; }
    figcaption { margin-top: 12px; display: flex; flex-direction: column; gap: 2px; font-size: 15px; }
    figcaption span { color: var(--steel); }
  `]
})
export class PortfolioComponent implements OnInit {
  items: any[] = [];
  isAdmin = false;
  showBefore: Record<string, boolean> = {};

  constructor(private products: ProductService, private admin: AdminService) {}

  ngOnInit() {
    this.admin.isAdmin$.subscribe(s => this.isAdmin = s);
    this.load();
  }

  load() {
    this.products.getProducts('portfolio').subscribe({
      next: data => this.items = data.filter(i => i.images?.length),
      error: () => this.items = []
    });
  }

  remove(id: string) {
    if (confirm('Да изтрия ли този монтаж?')) this.products.deleteProduct(id).subscribe(() => this.load());
  }
}
