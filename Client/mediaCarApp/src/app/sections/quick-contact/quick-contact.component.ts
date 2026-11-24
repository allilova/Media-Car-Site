import { Component } from '@angular/core';
import { QUICK_CONTACT } from '../../data/retrofy.data';

/** Бърз контакт – в тази ниша повечето продажби се затварят в първите 15 минути */
@Component({
  selector: 'app-quick-contact',
  standalone: true,
  template: `
  <div class="qc" [class.open]="open">
    @if (open) {
      <ul id="qc-list">
        @for (c of contacts; track c.label) {
          <li><a [href]="c.url" target="_blank" rel="noopener"><i [class]="c.icon" aria-hidden="true"></i>{{ c.label }}</a></li>
        }
      </ul>
    }
    <button class="qc-btn" (click)="open = !open" [attr.aria-expanded]="open" aria-controls="qc-list">
      <i class="fa-solid" [class.fa-comment-dots]="!open" [class.fa-xmark]="open" aria-hidden="true"></i>
      <span>{{ open ? 'Затвори' : 'Попитай за цена' }}</span>
    </button>
  </div>`,
  styles: [`
    .qc { position: fixed; right: 20px; bottom: 20px; z-index: 60; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
    .qc-btn { display: flex; align-items: center; gap: 10px; height: 52px; padding: 0 20px; border: 0; border-radius: 999px; background: var(--ink); color: #fff; font-weight: 600; box-shadow: 0 12px 28px -12px rgba(14,26,43,.6); }
    .qc-btn i { color: var(--amber); font-size: 18px; }
    ul { list-style: none; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-panel); padding: 6px; box-shadow: 0 16px 36px -18px rgba(14,26,43,.5); }
    a { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; text-decoration: none; font-weight: 500; min-width: 180px; }
    a:hover { background: var(--paper); }
    a i { width: 20px; font-size: 18px; color: var(--amber-ink); }
    @media (max-width: 480px) { .qc-btn span { display: none; } .qc-btn { width: 52px; padding: 0; justify-content: center; } }
  `]
})
export class QuickContactComponent {
  contacts = QUICK_CONTACT;
  open = false;
}
