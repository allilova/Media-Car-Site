/** Работни часове за монтаж: делнични вечери и уикенд */
export const WEEKDAY_SLOTS = ['18:30', '19:30', '20:30'];
export const WEEKEND_SLOTS = ['09:00', '11:00', '13:00', '15:00', '17:00'];

export function slotsFor(isoDate: string): string[] {
  if (!isoDate) return [];
  const day = new Date(isoDate + 'T12:00:00').getDay();
  return day === 0 || day === 6 ? WEEKEND_SLOTS : WEEKDAY_SLOTS;
}

export function toIso(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function formatBgDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso + 'T12:00:00').toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long' });
}

/** Монтажът е фиксирана услуга – цената се потвърждава и на сървъра */
export const INSTALLATION = { _id: 'service-installation', title: 'Мобилен монтаж на адрес (София)', price: 70 };
