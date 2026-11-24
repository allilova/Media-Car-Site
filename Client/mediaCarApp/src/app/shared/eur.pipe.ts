import { Pipe, PipeTransform } from '@angular/core';

/** Цена в евро: 380 → "€380", 72.5 → "€72,50" */
@Pipe({ name: 'eur', standalone: true })
export class EurPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    const n = Number(value);
    if (value === null || value === undefined || value === '' || isNaN(n)) return '';
    const hasCents = Math.round(n * 100) % 100 !== 0;
    return '€' + n.toLocaleString('bg-BG', {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2,
    });
  }
}
