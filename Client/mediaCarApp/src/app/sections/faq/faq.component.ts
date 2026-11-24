import { Component } from '@angular/core';
import { FAQ } from '../../data/retrofy.data';

@Component({
  selector: 'app-faq',
  standalone: true,
  template: `
  <section class="section" id="faq">
    <div class="wrap grid">
      <h2>Въпроси преди монтажа</h2>
      <div class="list">
        @for (item of faq; track item.q) {
          <details>
            <summary>{{ item.q }}</summary>
            <p>{{ item.a }}</p>
          </details>
        }
      </div>
    </div>
  </section>`,
  styles: [`
    .grid { display: grid; grid-template-columns: .7fr 1.3fr; gap: 56px; }
    h2 { max-width: 12ch; }
    details { border-bottom: 1px solid var(--line); }
    details:first-child { border-top: 1px solid var(--line); }
    summary { list-style: none; cursor: pointer; padding: 20px 40px 20px 0; position: relative; font-weight: 600; font-size: 18px; }
    summary::-webkit-details-marker { display: none; }
    summary::after { content: '+'; position: absolute; right: 4px; top: 50%; transform: translateY(-50%); font-size: 24px; font-weight: 400; color: var(--amber-ink); transition: transform .2s; }
    details[open] summary::after { transform: translateY(-50%) rotate(45deg); }
    details p { padding: 0 0 22px; color: var(--steel); max-width: 64ch; }
    @media (max-width: 820px) { .grid { grid-template-columns: 1fr; gap: 24px; } }
  `]
})
export class FaqComponent {
  faq = FAQ;
}
