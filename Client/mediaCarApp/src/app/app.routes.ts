import { Routes } from '@angular/router';
import { BasketShopComponent } from './basket-shop/basket-shop.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { TermsComponent } from './terms/terms.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Retrofy – Android мултимедия и CarPlay с монтаж на адрес в София' },
  { path: 'product/:id', component: ProductDetailsComponent, title: 'Продукт – Retrofy' },
  { path: 'basket-shop', component: BasketShopComponent, title: 'Количка – Retrofy' },
  { path: 'checkout', component: CheckoutComponent, title: 'Поръчка – Retrofy' },
  { path: 'search', component: SearchComponent, title: 'Търсене – Retrofy' },
  { path: 'booking', component: BookingComponent, title: 'Запази час за монтаж – Retrofy' },
  { path: 'usloviya', component: TermsComponent, title: 'Общи условия и гаранция – Retrofy' },
  { path: 'admin', component: AdminLoginComponent, title: 'Вход – Retrofy' },
  { path: 'admin-create', component: AdminCreateComponent, canActivate: [adminGuard] },
  { path: 'admin-edit/:id', component: AdminEditComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '/home' },
];
