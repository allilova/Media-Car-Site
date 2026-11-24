// Съдържание на сайта, взето от маркетинговото проучване на Retrofy.
// Промени цените и текстовете тук – компонентите ги четат оттук.

export const BRAND = {
  name: 'Retrofy',
  tagline: 'Мобилен ретрофит на мултимедии за автомобили 2005–2016',
  city: 'София',
  phone: '0899 064 299',
  phoneIntl: '359899064299',
  hours: 'Пн–Пт вечер 18:30–21:00, Сб–Нд 09:00–18:00',
};

// Попълни линковете, когато профилите са готови. Празните не се показват.
export const SOCIAL: { label: string; icon: string; url: string }[] = [
  { label: 'Facebook', icon: 'fa-brands fa-facebook', url: '' },
  { label: 'Instagram', icon: 'fa-brands fa-instagram', url: '' },
  { label: 'TikTok', icon: 'fa-brands fa-tiktok', url: '' },
];
export const GOOGLE_REVIEW_URL = ''; // линк „Напиши отзив“ от Google Business Profile
export const MESSENGER_URL = '';     // напр. https://m.me/<страница>

export const QUICK_CONTACT = [
  { label: 'Обади се', icon: 'fa-solid fa-phone', url: `tel:+${BRAND.phoneIntl}` },
  { label: 'Viber', icon: 'fa-brands fa-viber', url: `viber://chat?number=%2B${BRAND.phoneIntl}` },
  { label: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: `https://wa.me/${BRAND.phoneIntl}` },
  { label: 'Messenger', icon: 'fa-brands fa-facebook-messenger', url: MESSENGER_URL },
].filter(c => c.url);

/** Топ 10 марки (2005–2016) в София и България и най-масовите им модели */
export const CAR_BRANDS: { brand: string; models: string[] }[] = [
  { brand: 'Volkswagen', models: ['Golf V', 'Golf VI', 'Golf VII', 'Passat B6', 'Passat B7', 'Polo 9N3', 'Polo 6R', 'Tiguan I'] },
  { brand: 'BMW', models: ['3 серия E90', '3 серия F30', '5 серия E60', '5 серия F10', 'X5 E70', '1 серия E87'] },
  { brand: 'Mercedes-Benz', models: ['C-класа W204', 'E-класа W211', 'E-класа W212', 'ML W164', 'ML W166'] },
  { brand: 'Audi', models: ['A4 B7', 'A4 B8', 'A6 C6', 'A6 C7', 'A3 8P', 'A3 8V', 'Q7 4L'] },
  { brand: 'Ford', models: ['Focus Mk2', 'Focus Mk3', 'Fiesta Mk6', 'Fiesta Mk7', 'Mondeo Mk4'] },
  { brand: 'Opel', models: ['Astra H', 'Astra J', 'Corsa D', 'Corsa E', 'Insignia A', 'Zafira B'] },
  { brand: 'Toyota', models: ['Auris I', 'Auris II', 'Corolla', 'RAV4 XA30', 'RAV4 XA40', 'Avensis T25', 'Avensis T27', 'Yaris'] },
  { brand: 'Škoda', models: ['Octavia II', 'Octavia III', 'Superb II', 'Fabia II', 'Fabia III', 'Yeti'] },
  { brand: 'Renault', models: ['Megane III', 'Clio III', 'Clio IV', 'Scenic II', 'Scenic III', 'Captur'] },
  { brand: 'Peugeot', models: ['207', '208', '308 I', '308 II', '3008', '508'] },
];

export const YEARS = Array.from({ length: 12 }, (_, i) => String(2005 + i));

export const PREMIUM_BRANDS = ['BMW', 'Mercedes-Benz', 'Audi'];

export interface Package {
  id: 'basic' | 'standard' | 'premium';
  name: string;
  subtitle: string;
  price: string;
  priceFrom: number;
  duration: string;
  warranty: string;
  pitch: string;
  features: string[];
  featured?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: 'basic',
    name: 'Базов',
    subtitle: 'Smart Upgrade',
    price: '€270',
    priceFrom: 270,
    duration: '1,5–2 часа',
    warranty: '12 месеца',
    pitch: 'Навигация, музика и разговори без телефон в ръка.',
    features: [
      '9" или 10" Android медия, 4GB RAM / 32GB',
      'HD сензорен дисплей',
      'GPS, Wi-Fi, Bluetooth, Google Maps, Waze, YouTube',
      'Бутоните на волана (за съвместими коли)',
      'HD камера за заден ход с нощно виждане',
      'Рамка за вашия модел + CANBUS адаптер',
    ],
  },
  {
    id: 'standard',
    name: 'Стандартен',
    subtitle: 'Pro Performance',
    price: '€380',
    priceFrom: 380,
    duration: '~2 часа',
    warranty: '24 месеца',
    pitch: 'Бърза система без забавяне и безжичен CarPlay / Android Auto.',
    featured: true,
    features: [
      '8-ядрен процесор, 4GB RAM / 64GB',
      'QLED 1280×720, видим и на пряко слънце',
      'Вграден DSP за по-добър фабричен звук',
      'Безжичен Apple CarPlay и Android Auto',
      'Активно охлаждане с вентилатор',
      'Разделен екран: Waze + Spotify едновременно',
      'AHD 1080p камера 170° с паркинг линии',
      'USB изходи, изведени в жабката',
    ],
  },
  {
    id: 'premium',
    name: 'Премиум',
    subtitle: 'Ultimate',
    price: '€560–750',
    priceFrom: 560,
    duration: '3–4 часа',
    warranty: '24 месеца + заместващ апарат',
    pitch: 'За BMW, Mercedes и Audi – запазва оригиналните менюта и контролери.',
    features: [
      '8-ядрен процесор, 8GB RAM / 128GB',
      'Ultra HD QLED / IPS екран',
      '32-лентов DSP + оптичен / коаксиален изход',
      'Работят iDrive, MMI и COMAND, бордовият компютър остава',
      '4G слот за SIM карта – интернет в колата',
      'Оптични адаптери за Bose, Harman Kardon, B&O',
      'AHD 1080p нощна камера или 360° с 4 камери',
      'Пълно кодиране на автомобила',
    ],
  },
];

export const LABOR_PRICES = [
  { name: 'Монтаж на мултимедия (вашите части)', price: '€70–100' },
  { name: 'Камера за заден ход с прекарване на кабели', price: '€50–70' },
  { name: 'Мултимедия + камера (само труд)', price: '€100–130' },
  { name: 'Видеорегистратор със скрито окабеляване', price: '€35–50' },
  { name: 'MMI / CarPlay декодер зад фабричния екран (BMW, Audi, Mercedes)', price: '€120–160' },
];

/** Как протича – реална последователност */
export const STEPS = [
  { title: 'Изберете колата си', text: 'Марка, модел и година. Казваме кой пакет пасва и какво ще работи.' },
  { title: 'Запазете час', text: 'Делнични вечери или уикенд. Идваме на ваш адрес в София – вкъщи или пред офиса.' },
  { title: 'Монтаж за 2 часа', text: 'Plug & Play букси, без рязане на фабрични кабели. Пробваме волана, камерата и звука.' },
  { title: 'Обучение и гаранция', text: 'Свързваме телефона ви, показваме системата и оставяме гаранционна карта.' },
];

export const GUARANTEES = [
  { icon: 'fa-solid fa-car-battery', title: 'Акумулаторът не пада', text: 'Модулите преминават в пълен режим на покой – тестваме за утечка след всеки монтаж.' },
  { icon: 'fa-solid fa-scissors', title: 'Без рязане на кабели', text: 'Само преходници за вашия модел. Колата може да се върне фабрично по всяко време.' },
  { icon: 'fa-solid fa-tower-broadcast', title: 'Работи радиото и антената', text: 'Правилни адаптери за фабричната антена, GPS и микрофона на точните места.' },
  { icon: 'fa-solid fa-file-signature', title: 'Документ и гаранция', text: 'Фактура и гаранционна карта до 24 месеца – за хардуера и за труда.' },
];

export const COMPARISON = {
  rows: [
    { label: 'Обща цена', oem: '€1 800–4 000+', retro: '€270–750, всичко включено' },
    { label: 'Срок', oem: '1 до 3 дни', retro: '2–4 часа, на ваш адрес' },
    { label: 'CarPlay / Android Auto', oem: 'Често липсва безжично', retro: 'Безжично, вградено' },
    { label: 'Навигация', oem: 'Остаряла, платени актуализации', retro: 'Google Maps и Waze, винаги актуални' },
    { label: 'Приложения', oem: 'Няма', retro: 'YouTube, Spotify, Google Play' },
  ],
};

export const FAQ = [
  {
    q: 'Ще работят ли бутоните на волана и парктрониците?',
    a: 'Да, при съвместимите модели. CANBUS адаптерът предава командите от волана, задната предавка и парктрониците към новата медия. Ако за вашата кола има ограничение, казваме го преди монтажа.',
  },
  {
    q: 'Ще ми пада ли акумулаторът?',
    a: 'Не. Това е най-честата грешка при монтажи „на парче“. Свързваме медията така, че да заспива напълно, и мерим консумацията след монтажа.',
  },
  {
    q: 'Защо не оригинална медия от представителството?',
    a: 'За кола от 2008 г. оригинална система струва €1 800–4 000 и пак няма Waze и YouTube. Android медията струва под €400, монтирана, и прави повече.',
  },
  {
    q: 'Къде правите монтажа?',
    a: 'На адрес в София и до 20 км около нея – пред дома, офиса или друго място, което изберете. Трябва ни само място за паркиране.',
  },
  {
    q: 'Имам си мултимедия. Може ли само монтаж?',
    a: 'Да. Монтажът на ваша медия е €70–100, а с камера – €100–130. Вижте цените „само труд“ по-горе.',
  },
  {
    q: 'Какво става, ако медията се повреди?',
    a: 'Гаранцията е 12 или 24 месеца според пакета. Заменяме устройството до 24–48 часа, а при Премиум ви оставяме заместващ апарат.',
  },
];

export const B2B_SEGMENTS = [
  { icon: 'fa-solid fa-warehouse', title: 'Автокъщи', text: 'Модерна медия и камера вдигат цената на внесената кола. Отстъпка за всяка кола от партидата.' },
  { icon: 'fa-solid fa-taxi', title: 'Таксита и автопаркове', text: 'Надеждни системи с навигация и камера, монтирани по график, без да спират колите за дни.' },
  { icon: 'fa-solid fa-handshake', title: 'Автомивки и сервизи', text: 'Препоръчайте ни на клиентите си и получете комисиона за всеки монтаж.' },
];
