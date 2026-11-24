import { Component } from '@angular/core';
import { STEPS } from '../../data/retrofy.data';

@Component({
  selector: 'app-steps',
  standalone: true,
  template: `
  <section class="section steps" id="how">
    <div class="wrap">
      <div class="section-head"><h2>От запитване до работещ CarPlay</h2></div>
      <ol>
        @for (s of steps; track s.title; let i = $index) {
          <li>
            <span class="n">{{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        }
      </ol>
    </div>
  </section>`,
  styles: [`
    .steps { background: var(--surface); border-block: 1px solid var(--line); }
    ol { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; counter-reset: s; }
    li { position: relative; padding-top: 24px; border-top: 3px solid var(--ink); }
    li:first-child { border-top-color: var(--amber); }
    .n { font-family: var(--f-display); font-size: 15px; font-weight: 600; color: var(--amber-ink); }
    h3 { margin-top: 10px; font-size: 18px; }
    p { margin-top: 8px; color: var(--steel); font-size: 15px; }
    @media (max-width: 860px) { ol { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 520px) { ol { grid-template-columns: 1fr; } }
  `]
})
export class StepsComponent {
  steps = STEPS;
}
