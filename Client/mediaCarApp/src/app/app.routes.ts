import { Routes } from '@angular/router';
import { BasketShopComponent } from './basket-shop/basket-shop.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BookingComponent } from './booking/booking.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    { path: 'product', component: ProductDetailsComponent },
    {path: 'basket-shop', component: BasketShopComponent},
    {path: 'search', component: SearchComponent},
    {path: 'booking', component: BookingComponent}
];
