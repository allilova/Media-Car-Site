import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LABOR_PRICES } from '../../data/retrofy.data';

@Component({
  selector: 'app-labor',
  standalone: true,
  imports: [RouterLink],
  template: `
  <section class="section labor" id="labor">
    <div class="wrap grid">
      <div>
        <h2>Вече имате медия?</h2>
        <p class="muted lead">Монтираме и ваши устройства и аксесоари. Цените са само за труда, на ваш адрес в София.</p>
        <a class="btn btn-primary" routerLink="/booking" [queryParams]="{ package: 'Само монтаж' }">Запази час за монтаж</a>
      </div>
      <ul class="board">
        @for (l of prices; track l.name) {
          <li><span class="name">{{ l.name }}</span><span class="dots" aria-hidden="true"></span><span class="price">{{ l.price }}</span></li>
        }
      </ul>
    </div>
  </section>`,
  styles: [`
    .labor { background: var(--glass); color: #E8EEF6; }
    .grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 56px; align-items: start; }
    .lead { margin: 14px 0 26px; color: #9FB0C6; max-width: 36ch; }
    .board { list-style: none; }
    li { display: flex; align-items: baseline; gap: 12px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
    .name { max-width: 34ch; }
    .dots { flex: 1; border-bottom: 1px dotted rgba(255,255,255,.3); transform: translateY(-4px); min-width: 20px; }
    .price { color: var(--amber); white-space: nowrap; font-size: 18px; }
    @media (max-width: 820px) { .grid { grid-template-columns: 1fr; gap: 32px; } }
  `]
})
export class LaborComponent {
  prices = LABOR_PRICES;
}
