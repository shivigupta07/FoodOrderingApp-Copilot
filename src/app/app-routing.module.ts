import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  //provide code here to route to food-list and shopping-cart component
  { path: '', redirectTo: '/food-list', pathMatch: 'full' },
  { path: 'food-list', component: FoodListComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { path: 'order-history', component: OrderHistoryComponent },

  //404 page
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
