import { Component } from '@angular/core';
import { GUARANTEES, COMPARISON, GOOGLE_REVIEW_URL } from '../../data/retrofy.data';

@Component({
  selector: 'app-trust',
  standalone: true,
  template: `
  <section class="section" id="guarantee">
    <div class="wrap">
      <div class="section-head">
        <h2>Монтаж, след който колата е като фабрична</h2>
        <p>Най-честите оплаквания от монтажи „на парче“ са паднал акумулатор, мъртво радио и разкривени панели. Ето какво гарантираме.</p>
      </div>
      <div class="guarantees">
        @for (g of guarantees; track g.title) {
          <div class="g">
            <i [class]="g.icon" aria-hidden="true"></i>
            <h3>{{ g.title }}</h3>
            <p>{{ g.text }}</p>
          </div>
        }
      </div>

      <div class="compare">
        <h3 class="compare-title">Оригинална медия от представителство или Android от нас?</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col"></th><th scope="col">Оригинална (OEM)</th><th scope="col" class="us">Retrofy</th></tr></thead>
            <tbody>
              @for (r of comparison.rows; track r.label) {
                <tr><th scope="row">{{ r.label }}</th><td>{{ r.oem }}</td><td class="us">{{ r.retro }}</td></tr>
              }
            </tbody>
          </table>
        </div>
        <p class="why">За кола, която струва €4 000–6 000, оригинална система за €2 500 не се връща. Затова 9 от 10 собственици на коли от 2005–2016 избират Android медия.</p>
        @if (reviewUrl) {
          <a class="btn btn-ghost" [href]="reviewUrl" target="_blank" rel="noopener">Прочетете отзивите в Google</a>
        }
      </div>
    </div>
  </section>`,
  styles: [`
    .guarantees { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
    .g i { font-size: 22px; color: var(--amber-ink); }
    .g h3 { margin-top: 14px; font-family: var(--f-body); font-weight: 700; font-size: 17px; }
    .g p { margin-top: 6px; font-size: 15px; color: var(--steel); }
    .compare { margin-top: 72px; }
    .compare-title { font-size: 22px; max-width: 30ch; }
    .table-wrap { overflow-x: auto; margin-top: 22px; }
    table { width: 100%; border-collapse: collapse; min-width: 560px; font-size: 15px; }
    th, td { text-align: left; padding: 14px 16px; border-bottom: 1px solid var(--line); vertical-align: top; }
    thead th { font-size: 14px; color: var(--steel); font-weight: 600; }
    tbody th { font-weight: 600; width: 24%; }
    td { color: var(--steel); }
    td.us { color: var(--ink); font-weight: 600; background: var(--amber-soft); }
    thead th.us { color: var(--amber-ink); background: var(--amber-soft); border-radius: 8px 8px 0 0; }
    .why { margin: 20px 0; max-width: 64ch; color: var(--steel); }
    @media (max-width: 900px) { .guarantees { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 520px) { .guarantees { grid-template-columns: 1fr; } }
  `]
})
export class TrustComponent {
  guarantees = GUARANTEES;
  comparison = COMPARISON;
  reviewUrl = GOOGLE_REVIEW_URL;
}
