import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PACKAGES } from '../../data/retrofy.data';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [RouterLink],
  template: `
  <section class="section" id="packages">
    <div class="wrap">
      <div class="section-head">
        <h2>Пакет „всичко в едно“</h2>
        <p>Медия, рамка за вашия модел, CANBUS адаптер, камера за заден ход и монтаж на адрес. Една цена, без доплащане за преходници.</p>
      </div>

      <div class="tiers">
        @for (p of packages; track p.id) {
          <article class="tier" [class.featured]="p.featured">
            @if (p.featured) { <p class="flag">Най-избиран</p> }
            <h3>{{ p.name }} <span class="sub">{{ p.subtitle }}</span></h3>
            <p class="price">{{ p.price }}</p>
            <p class="incl">с включен монтаж</p>
            <p class="pitch">{{ p.pitch }}</p>
            <ul>
              @for (f of p.features; track f) { <li>{{ f }}</li> }
            </ul>
            <dl>
              <div><dt>Монтаж</dt><dd>{{ p.duration }}</dd></div>
              <div><dt>Гаранция</dt><dd>{{ p.warranty }}</dd></div>
            </dl>
            <a class="btn btn-block" [class.btn-primary]="p.featured" [class.btn-dark]="!p.featured"
               routerLink="/booking" [queryParams]="{ package: p.name }">Запази {{ p.name }}</a>
          </article>
        }
      </div>
      <p class="note">Цените са крайни, в евро, с ДДС. Точната цена за Премиум зависи от колата и озвучаването (Bose, Harman Kardon, B&amp;O).</p>
    </div>
  </section>`,
  styles: [`
    .tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--line); border-radius: var(--r-panel); background: var(--surface); }
    .tier { position: relative; display: flex; flex-direction: column; padding: 32px 28px; border-left: 1px solid var(--line); }
    .tier:first-child { border-left: 0; }
    .tier.featured { background: var(--glass); color: #E8EEF6; border-radius: var(--r-panel); margin: -12px 0; padding-top: 44px; border-left: 0; box-shadow: 0 24px 48px -28px rgba(14,26,43,.6); }
    .tier.featured + .tier { border-left: 0; }
    .flag { position: absolute; top: 14px; left: 28px; font-size: 13px; font-weight: 600; color: var(--amber); }
    h3 { font-size: 22px; }
    .sub { display: block; margin-top: 4px; font-family: var(--f-body); font-size: 14px; font-weight: 500; color: var(--steel); }
    .featured .sub { color: #9FB0C6; }
    .price { margin-top: 20px; font-size: 40px; line-height: 1; }
    .featured .price { color: var(--amber); }
    .incl { font-size: 14px; color: var(--steel); margin-top: 6px; }
    .featured .incl, .featured dt { color: #9FB0C6; }
    .pitch { margin-top: 16px; font-weight: 500; }
    ul { list-style: none; margin: 18px 0 22px; display: grid; gap: 9px; font-size: 15px; }
    li { position: relative; padding-left: 22px; }
    li::before { content: ''; position: absolute; left: 0; top: .55em; width: 10px; height: 6px; border-left: 2px solid var(--amber); border-bottom: 2px solid var(--amber); transform: rotate(-45deg); }
    dl { margin-top: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px 0 20px; border-top: 1px solid var(--line); font-size: 14px; }
    .featured dl { border-top-color: rgba(255,255,255,.12); }
    dt { color: var(--steel); }
    dd { font-weight: 600; }
    .note { margin-top: 28px; font-size: 14px; color: var(--steel); max-width: 70ch; }
    @media (max-width: 920px) {
      .tiers { grid-template-columns: 1fr; border: 0; background: none; gap: 16px; }
      .tier { border: 1px solid var(--line); border-radius: var(--r-panel); background: var(--surface); }
      .tier.featured { margin: 0; order: -1; }
    }
  `]
})
export class PackagesComponent {
  packages = PACKAGES;
}
