import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/logo.component';
import { BRAND, SOCIAL } from '../../data/retrofy.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  template: `
  <footer>
    <div class="wrap grid">
      <div>
        <app-logo [light]="true"></app-logo>
        <p class="tag">{{ brand.tagline }}.</p>
      </div>
      <div>
        <h3>Контакт</h3>
        <a [href]="'tel:+' + brand.phoneIntl">{{ brand.phone }}</a>
        <p>{{ brand.hours }}</p>
        <p>Монтаж на адрес: {{ brand.city }} и до 20 км</p>
      </div>
      <div>
        <h3>Магазин</h3>
        <a routerLink="/booking">Запази час</a>
        <a routerLink="/search">Търсене</a>
        <a routerLink="/usloviya">Общи условия и гаранция</a>
      </div>
      @if (social.length) {
        <div>
          <h3>Последвайте ни</h3>
          <div class="social">
            @for (s of social; track s.label) {
              <a [href]="s.url" target="_blank" rel="noopener" [attr.aria-label]="s.label"><i [class]="s.icon"></i></a>
            }
          </div>
        </div>
      }
    </div>
    <div class="wrap bottom">
      <span>© {{ year }} Retrofy</span>
      <a routerLink="/admin">Вход за администратор</a>
    </div>
  </footer>`,
  styles: [`
    footer { background: var(--ink); color: #C6D2E1; padding: 64px 0 28px; font-size: 15px; }
    .grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px; }
    .tag { margin-top: 14px; max-width: 30ch; color: #9FB0C6; }
    h3 { font-family: var(--f-body); font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    a { display: block; color: #C6D2E1; text-decoration: none; margin-bottom: 8px; }
    a:hover { color: #fff; }
    p { margin-bottom: 8px; }
    .social { display: flex; gap: 14px; font-size: 22px; }
    .bottom { display: flex; justify-content: space-between; margin-top: 48px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,.1); font-size: 13px; color: #8293A9; }
    .bottom a { margin: 0; color: #8293A9; }
    @media (max-width: 820px) { .grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
  `]
})
export class FooterComponent {
  brand = BRAND;
  social = SOCIAL.filter(s => s.url);
  year = new Date().getFullYear();
}
