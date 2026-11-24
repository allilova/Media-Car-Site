import { Component, Input } from '@angular/core';

/** Знак: стар екран, в който „изгрява“ кехлибарена дъга – колата получава нов живот */
@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <span class="logo" [class.light]="light">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="4" y="12" width="56" height="40" rx="9" [attr.fill]="light ? '#FFFFFF' : '#16202E'"/>
        <rect x="11" y="19" width="42" height="26" rx="4" [attr.fill]="light ? '#E9EDF1' : '#1B2B42'"/>
        <path d="M20 38a12 12 0 0 1 24 0" fill="none" stroke="#F08C1A" stroke-width="4" stroke-linecap="round"/>
        <circle cx="32" cy="38" r="3.5" fill="#F08C1A"/>
      </svg>
      <span class="word">Retrofy</span>
    </span>`,
  styles: [`
    .logo { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); }
    .logo.light { color: #fff; }
    svg { width: 34px; height: 34px; }
    .word { font-family: var(--f-display); font-weight: 700; font-size: 21px; letter-spacing: -0.02em; }
  `]
})
export class LogoComponent {
  @Input() light = false;
}
