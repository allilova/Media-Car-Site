import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { B2B_SEGMENTS } from '../../data/retrofy.data';

@Component({
  selector: 'app-b2b',
  standalone: true,
  imports: [FormsModule],
  template: `
  <section class="section b2b" id="b2b">
    <div class="wrap grid">
      <div>
        <h2>За автокъщи и автопаркове</h2>
        <div class="segments">
          @for (s of segments; track s.title) {
            <div class="seg">
              <i [class]="s.icon" aria-hidden="true"></i>
              <div><h3>{{ s.title }}</h3><p>{{ s.text }}</p></div>
            </div>
          }
        </div>
      </div>

      <form class="form" (ngSubmit)="send()" #f="ngForm">
        <h3>Поискайте фирмена оферта</h3>
        <div class="field"><label for="b-company">Фирма</label><input id="b-company" name="company" [(ngModel)]="data.company" required></div>
        <div class="row">
          <div class="field"><label for="b-name">Лице за контакт</label><input id="b-name" name="name" [(ngModel)]="data.name" required></div>
          <div class="field"><label for="b-phone">Телефон</label><input id="b-phone" name="phone" type="tel" [(ngModel)]="data.phone" required></div>
        </div>
        <div class="field">
          <label for="b-fleet">Брой коли</label>
          <select id="b-fleet" name="fleetSize" [(ngModel)]="data.fleetSize">
            <option>1–5</option><option>6–20</option><option>Над 20</option>
          </select>
        </div>
        <div class="field"><label for="b-msg">Какви коли и какво ви трябва</label><textarea id="b-msg" name="message" [(ngModel)]="data.message" required></textarea></div>
        <button class="btn btn-primary btn-block" [disabled]="sending || !f.valid">{{ sending ? 'Изпращане…' : 'Изпрати запитването' }}</button>
        @if (status) { <p class="status" [class.err]="isError" role="status">{{ status }}</p> }
      </form>
    </div>
  </section>`,
  styles: [`
    .b2b { background: var(--surface); border-block: 1px solid var(--line); }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
    .segments { margin-top: 28px; display: grid; gap: 24px; }
    .seg { display: flex; gap: 16px; }
    .seg i { font-size: 20px; color: var(--amber-ink); width: 28px; margin-top: 3px; }
    .seg h3 { font-family: var(--f-body); font-weight: 700; font-size: 17px; }
    .seg p { color: var(--steel); font-size: 15px; margin-top: 4px; }
    .form { display: grid; gap: 14px; padding: 28px; border: 1px solid var(--line); border-radius: var(--r-panel); background: var(--paper); }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .status { font-size: 15px; color: var(--ok); }
    .status.err { color: var(--danger); }
    @media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
    @media (max-width: 480px) { .row { grid-template-columns: 1fr; } }
  `]
})
export class B2bComponent {
  segments = B2B_SEGMENTS;
  data = { company: '', name: '', phone: '', fleetSize: '1–5', message: '' };
  sending = false;
  status = '';
  isError = false;

  constructor(private http: HttpClient) {}

  send() {
    this.sending = true;
    this.status = '';
    this.http.post('/api/contact', { ...this.data, type: 'b2b', subject: this.data.company }).subscribe({
      next: () => {
        this.sending = false; this.isError = false;
        this.status = 'Запитването е изпратено. Ще ви се обадим в рамките на работния ден.';
        this.data = { company: '', name: '', phone: '', fleetSize: '1–5', message: '' };
      },
      error: (e) => {
        this.sending = false; this.isError = true;
        this.status = e.error?.error || 'Запитването не беше изпратено. Обадете ни се на телефона.';
      }
    });
  }
}
