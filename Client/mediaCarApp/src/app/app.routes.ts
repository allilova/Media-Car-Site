import { Routes } from '@angular/router';
import { BasketShopComponent } from './basket-shop/basket-shop.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'basket-shop', component: BasketShopComponent}
];
