import { CartDetailsComponent } from './cart-details/cart-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/shop-at-tact',
    pathMatch: 'full'
  },
  {
    path: 'shop-at-tact',
    component: ProductDetailsComponent
  },
  {
    path: 'your-cart',
    component: CartDetailsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
