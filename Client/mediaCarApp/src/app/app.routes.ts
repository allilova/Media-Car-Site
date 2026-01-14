import { Routes } from '@angular/router';
import { BasketShopComponent } from './basket-shop/basket-shop.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BookingComponent } from './booking/booking.component';
import { BasketPlusComponent } from './basket-shop/basket-plus/basket-plus.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    { path: 'product/:id', component: ProductDetailsComponent },
    {path: 'basket-shop', component: BasketShopComponent},
    {path: 'basket-plus', component: BasketPlusComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'search', component: SearchComponent},
    {path: 'booking', component: BookingComponent},
    {path: 'admin', component: AdminLoginComponent},
    {path: 'admin-create', component: AdminCreateComponent},
    {path: 'admin-edit/:id', component: AdminEditComponent},
];
